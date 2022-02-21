const User = require('../model/user')
const router = require('express').Router()
router.post('/delete', async (req,res)=>{
    const UserName = req.body.username
    const user = await User.findOne({username:UserName})
    if(!user) {
        return res.json({
            status: 'error',
            error: 'User not in Database!'})
        }
        try{
    const result = await User.deleteOne( {username:UserName} )
    console.log(result)
        }
        catch (error){
            console.log(error)
        }
        return res.json({
            status: 'ok'})
})

module.exports = router