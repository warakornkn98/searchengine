const express = require('express')
const { getBloodinfo } = require('../controller/search')

const router =  express.Router()

router.post('/bloodinfo',getBloodinfo)

module.exports = router