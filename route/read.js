const User = require('../model/user')
const router = require('express').Router()
router.post('/read', async (req,res)=>{
    const UserName = req.body.username
    const user = await User.findOne({username:UserName})

    if(!user) {
        return res.json({
            status: 'error',
            error: 'Username Not Found!'})
    }
    const {_id,username, website, password, email} = user
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