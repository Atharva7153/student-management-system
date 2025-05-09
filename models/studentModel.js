const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

    userName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        enum : ['Male', 'Female', 'other']
    },

    course: {
        type: String,
        enum: ['BTech', 'BCA', 'BSc', 'MCA', 'MTech'], // only these allowed
        required: true
    },
    
    hobbies : [String],

    photo : {
        type : String,
    },
})

const Student = mongoose.model('Studento', StudentSchema)

module.exports = Student