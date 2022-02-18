const User = require('../model/user')
const router = require('express').Router()



router.get('/', (req,res) =>{
    res.render('index',{
        'title': 'Welcome Page'
    })
})
router.get('/save', (req,res) =>{
    res.render('save',{
        'title': 'Save Data'
    })
})

router.get('/update', (req,res) =>{
    res.render('update',{
        'title': 'Update Data'
    })
})

router.get('/delete', (req,res) =>{
    res.render('delete',{
        'title': 'Delete Data'
    })
})
router.get('/read', (req,res) =>{
    res.render('read',{
        'title': 'Read Data'
    })
})



module.exports = router