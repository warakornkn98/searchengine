const express = require('express')
const { login, getUserData, signup, getAllUsers, confirmUser} = require('../controller/auth')

const router =  express.Router()

router.get('/users',getAllUsers)
router.get("/user/:userId", getUserData);
router.post('/login',login)
router.post("/signup", signup);
router.post('/confirm-user/:id',confirmUser)


module.exports = router