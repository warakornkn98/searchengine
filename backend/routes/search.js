const express = require('express')
const { getBloodinfo, getAllBloodinfo, addBloodInfo } = require('../controller/search')

const router =  express.Router()

router.get('/bloodinfo',getAllBloodinfo)
router.post('/bloodinfo',getBloodinfo)
router.post("/addbloodinfo", addBloodInfo);


module.exports = router
