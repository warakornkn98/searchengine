const express = require('express')
const { login, getUserData, signup, getAllUsers, confirmUser, updateUser, updatePassword} = require('../controller/auth')

const router =  express.Router()

router.get('/users',getAllUsers)
router.get("/user/:userId", getUserData);
router.post('/login',login)
router.post("/signup", signup);
router.post('/confirm-user/:id',confirmUser)
router.put('/updateUser/:userId', updateUser);
router.put('/updatePassword/:userId', updatePassword);

module.exports = router