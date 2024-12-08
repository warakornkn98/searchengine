const express = require('express');
const { getAllBloodinfo, getBloodinfo, addBloodInfo } = require('../controller/ิblood');
const { checkDuplicatePublicId } = require('../middleware/checkDuplicatePublicId');

const router =  express.Router()

router.get('/bloodinfo',getAllBloodinfo)
router.post('/bloodinfo',getBloodinfo)
router.post('/addbloodinfo',checkDuplicatePublicId,addBloodInfo);


module.exports = router
