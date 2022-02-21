const User = require('../model/user')
const router = require('express').Router()

router.post('/update', async (req,res)=>{
    const {username: UserName, password: plainpassword} = req.body
    const user = await User.findOne({UserName})
    console.log(UserName, plainpassword)
    if(!user) {
        return res.json({
            status: 'error',
            error: 'Username Not Found!'})
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
                const result = await User.updateOne({username:UserName},
                    {
                    $set:{
                    password:plainpassword,
                    }
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