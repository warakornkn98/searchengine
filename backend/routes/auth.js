const express = require('express')
const { login, getUserProfile, signup } = require('../controller/auth')

const router =  express.Router()

router.post('/login',login)
router.post("/signup", signup);
router.post('/profile/:username',getUserProfile)


module.exports = router