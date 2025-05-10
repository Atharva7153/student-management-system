const mongoose = require('mongoose')
const Student = require("../models/studentModel")
const Topper = require("../models/topperModel")
const {format} = require('@fast-csv/format')
const PdfDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')


exports.HomePage = (req, res, next) =>{
    res.render('homePage', {
        user : req.session.user,
    })
}

exports.Students = async (req, res, next) =>{
    const students = await Student.find()
    res.render('students', {students})

    console.log(students)
}

exports.getbyID = async (req, res, next) =>{
    const id = req.params._id
    const student = await Student.findById(id)
    
    res.render('studentDetails', {
        student,
        user : req.session.user,
    })
}

exports.saveStudent = async (req, res) =>{

    try{

        const {userName, email, gender, course} = req.body
        
        let hobbies = req.body.hobbies;

        console.log(req.file)

        const photoPath = req.file ? req.file.path : null;

        // if only one hobby selected, convert it to array
        if (!Array.isArray(hobbies)) {
          hobbies = [hobbies];
        }
        const student = new Student({
            userName, 
            email, 
            gender, 
            course, 
            hobbies,
            photo : photoPath
        })

        await student.save()

        res.redirect('/students')

        console.log("Student Saved")

        

    }catch (err){
        console.log("Error", err)
    }
}

exports.DeleteByID = async (req, res) =>{

    const id = req.params._id
    await Student.findByIdAndDelete(id)
    res.render('deleted')
}

exports.editForm = async (req, res) =>{

    const id = req.params._id
    const student = await Student.findById(id)

    res.render("editPage", {student})
}

exports.editById = async (req, res) =>{
    
    const{userName, email, gender, course} = req.body;
    const id = req.params._id;

    let hobbies = req.body.hobbies;
    if (!Array.isArray(hobbies)) {
      hobbies = [hobbies];
    }
    
    const updateData = {
        userName,
        email,
        gender,
        course,
        hobbies,
    }

    if (req.file) {
        updateData.photo = req.file.path;
    }

    await Student.findByIdAndUpdate(id, updateData)

    res.redirect("/students")

}

exports.downloadFile = async (req, res) => {

    try{
        const students = await Student.findById(req.params._id)
        if(!students) return res.status(404).send("Student not found")
        
        const fileName = `Student-${students.userName.replace(/\s+/g, '-')}.csv`
        const filePath = path.join(__dirname, '..', 'public', 'files', fileName)
        const ws = fs.createWriteStream(filePath)
        const csv = format({ headers: true })

        csv.pipe(ws).on('finish', ()=>{
            res.download(filePath, fileName, ()=>{
                fs.unlink(filePath, (err)=>{
                    if(err) console.log(err)
                })
            })
        })

        csv.write({
            userName: students.userName,
            email: students.email,
            hobbies: students.hobbies,
            course: students.course,
            gender: students.gender
        })

        csv.end()
    } catch (err){
        console.log(err)
        res.status(500).send("Error downloading file")
    }
}

exports.downloadFilePdf = async (req, res) =>{

    const doc = new PdfDocument()

    const students = await Student.findById(req.params._id)

    const filePath = path.join(__dirname, '..', 'public', 'files', `${students.userName}.pdf`)
    const writeStream = fs.createWriteStream(filePath)
    doc.pipe(writeStream)

    doc.fontSize(24).text(`Details of ${students.userName}`, {
        align: 'center',
        underline: true,
        margin: 50
    })
    doc.moveDown()
    doc.text(`Email: ${students.email}`)
    doc.text(`Gender: ${students.gender}`)
    doc.text(`Course: ${students.course}`)
    doc.text(`Hobbies: ${students.hobbies.join(', ')}`)

    doc.end()


    writeStream.on('finish', ()=>{
        res.download(filePath, ()=>{
            fs.unlink(filePath, (err)=>{
                if(err) console.log(err)
            })
        })
    })
    
}

exports.downloadPhoto = (req, res) =>{

    const fileName = req.params.filename
    const filePath = path.join(__dirname, '../uploads/students', fileName)
    console.log("Attempting to download:", filePath)

    res.download(filePath, (err)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error downloading file")
        }
    })
}


exports.addTopper = async (req, res) =>{
    try{
        const id = req.params._id
        const student = await Student.findById(id)

        if(!student){ 
            return res.status(404).send("Student not found")
        }
        
        const topper = new Topper({ student : id})
        await topper.save()
        res.redirect('/toppers')

    } catch {
        res.status(500).send("Error adding topper")
    }

    console.log("Topper Added")

}

exports.getTopper = async (req, res) => {
    try {
        const toppers = await Topper.find().populate('student')
        res.render('toppers', { toppers })
    } catch (err) {
        console.error(err)
        res.status(500).send("Error fetching toppers")
    }
}