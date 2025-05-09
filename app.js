const express = require('express')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const studentRouter = require('./routes/studentRouter')
const authRouter = require('./routes/authRoutes')
const connectToDatabase = require('./utils/database')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')


const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.use(session({

    secret : "Atharva Sharma's Session",

    resave : false,

    saveUninitialized : true,

    store : MongoStore.create({
        mongoUrl : 'mongodb+srv://AtharvaS7153:ddskdhf123@atharvadb.olmumix.mongodb.net/?retryWrites=true&w=majority&appName=AtharvaDB'
    }),

    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }


}))

app.use(flash())
app.use((req, res, next)=>{
    res.locals.message = req.flash('message')
    next();
})

app.use(authRouter)
app.use(studentRouter)

app.use((req, res, next)=>{
    res.status(404)
    res.render('error')
})


mongoose
  .connect('mongodb+srv://AtharvaS7153:ddskdhf123@atharvadb.olmumix.mongodb.net/?retryWrites=true&w=majority&appName=AtharvaDB')
  .then(() => app.listen(3002, () => console.log('Server at http://localhost:3002')))
  .catch((err) => console.log(err));