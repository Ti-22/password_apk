const User = require('../model/user')
const router = require('express').Router()
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

module.exports = router