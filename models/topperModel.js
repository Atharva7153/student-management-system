const mongoose = require('mongoose');

const topperSchema = new mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Studento',
        required : true
    },

    addedAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Topper', topperSchema);

