const express = require('express')
const { getBloodinfo, getAllBloodinfo } = require('../controller/search')

const router =  express.Router()

router.get('/bloodinfo',getAllBloodinfo)
router.post('/bloodinfo',getBloodinfo)


module.exports = router
