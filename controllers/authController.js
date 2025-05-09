const {check, validationResult} = require('express-validator');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


exports.checkAuth = (req, res, next) => {
    if(req.session.isLoggedIn){
        next();
    }else{
        req.flash('message', 'Please log in to continue.');
        res.redirect('/login');
    }
}

exports.signupValidation = [

    check('userName')
    .notEmpty()
    .withMessage('Please enter a valid username'),

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value) =>{
        const existingUser = await User.findOne({email: value})
        if(existingUser){
            throw new Error('Email already in use')
        }
    }),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),

    check('role')
    .notEmpty()
    .withMessage('Please select a role')
    .isIn(['student', 'teacher']).withMessage('Please select a valid role')
]

exports.getSignup = (req, res) => {

    res.render('signup', {errorMessages : [], oldInput : {}})
}

exports.postSignup = async (req, res) => {

    const {userName, email, password, role} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.render('signup', {errorMessages : errors.array(), oldInput : req.body})
    }

    const hashedPassword = await  bcrypt.hash(password, 12)
    
    await User.create({
        name : userName,
        email,
        password: hashedPassword,
        role
    })

    res.redirect('/login')
}

exports.login = (req, res,) =>{
    res.render('login', {errorMessages : [], oldInput : {}})
}

exports.postlogin = async (req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if(!user){
        return res.render('login', {
            errorMessages : [{msg: 'Invalid email or password'}],
            oldInput : req.body
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.render('login', {
            errorMessages : [{msg: 'Invalid email or password'}],
            oldInput : req.body
        })
    }

    req.session.isLoggedIn = true
    req.session.user = user
    res.redirect('/')
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
        }
        res.redirect('/login')
    })
}
