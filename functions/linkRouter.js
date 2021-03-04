const router = require('express').Router();

const {getLinks,createLink,deleteLink,updateLink}=require('./linkController')

router.get('/get', getLinks)
router.delete('/delete/:id', deleteLink)
router.patch('/update', updateLink)
router.post('/create', createLink)


module.exports=router