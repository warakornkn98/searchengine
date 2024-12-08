const express = require('express');
const { getAllBloodinfo, getBloodinfo, addBloodInfo } = require('../controller/ิblood');

const router =  express.Router()

router.get('/bloodinfo',getAllBloodinfo)
router.post('/bloodinfo',getBloodinfo)
router.post('/addbloodinfo', addBloodInfo);


module.exports = router
