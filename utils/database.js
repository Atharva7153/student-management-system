const moongoose = require('mongoose')

const connectToDatabase = async ()=>{

    try{

        await moongoose.connect('mongodb+srv://AtharvaS7153:ddskdhf123@atharvadb.olmumix.mongodb.net/?retryWrites=true&w=majority&appName=AtharvaDB')


        console.log("connected to Mongo DB")


    }catch(err){


        console.log("error connecting to MONGO DB", err)
    }
}

module.exports = connectToDatabase