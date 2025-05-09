const express = require('express')
const StudentController = require("../controllers/studentController")
const upload = require("../middlewares/multerConfig")


const router = express.Router()

router.get("/", StudentController.HomePage)
router.post("/add-student", upload.single('photo'), StudentController.saveStudent)
router.get("/students", StudentController.Students)
router.get("/studentDetails/:_id", StudentController.getbyID)
router.post("/delete-student/:_id", StudentController.DeleteByID)
router.get("/edit-student/:_id", StudentController.editForm)
router.post("/edit-student/:_id", upload.single("photo"), StudentController.editById)
router.get('/download/csv/:_id', StudentController.downloadFile)
router.get('/download/pdf/:_id', StudentController.downloadFilePdf)
router.get('/download/:filename', StudentController.downloadPhoto)



module.exports = router;
