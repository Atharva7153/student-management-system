const express = require('express')



const router = express.Router()

router.get((req, res, next) =>{
    res.status(404);
    res.send("<h1>Error Bro ERROR </h1>")
})

module.exports = router;