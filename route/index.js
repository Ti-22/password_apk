const bcrypt = require('bcryptjs/dist/bcrypt')
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

router.post('/save', async(req,res)=>{
    const {username, website, password: plainpassword, email} = req.body
    console.log(username, website, plainpassword, email)
    if(!username || !email) {
        return res.json({
            status: 'error',
            error: 'Username and email needed'
        })
    }
    if(!plainpassword || typeof(plainpassword) !== 'string'){
        return res.json({
            status: 'error',
            error:'invalid password!'
        })
    }
    if(plainpassword.length < 7){
        return res.json({
            status: 'error',
            error: 'password too small at least 8 characters'
        })
    }
    // const password = await bcrypt.hash(plainpassword, 10)
    try{
        const result = await User.create({
            username,
            website,
            password:plainpassword,
            email
        })
        console.log(result)
    }catch (error){
        if(error.code === 11000) {
            return res.json({
                status: 'error',
                error: 'Usernsme is already in used!'
            })
        }
            throw error;
    }
    res.json({ status : 'ok'})
})

router.post('/read', async (req,res)=>{
    const {UserName} = req.body
    const user = await User.findOne({UserName}).lean()
    const {_id,username, website, password, email} = user
    console.log(_id)
    if(!user) {
        return res.json({
            status: 'error',
            error: 'Invalid Username!'})
    }
    return res.json({
        status: 'ok',
        data: {_id,
            username,
            website,
            password,
            email }
    })
})

module.exports = router