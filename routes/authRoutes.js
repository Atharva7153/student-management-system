const express = require('express')
const authController = require("../controllers/authController")

const router = express.Router()

router.get("/signup", authController.getSignup)
router.post("/signup", authController.signupValidation, authController.postSignup)

router.get("/login", authController.login)
router.post("/login", authController.postlogin)

router.post("/logout", authController.logout)

router.use(authController.checkAuth)


module.exports = router;
