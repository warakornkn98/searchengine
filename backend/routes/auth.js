const express = require('express')
const { login, getUserProfile } = require('../controller/auth')

const router =  express.Router()

router.post('/login',login)
router.post('/profile/:username',getUserProfile)


module.exports = router