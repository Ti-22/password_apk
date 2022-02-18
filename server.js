const mongoose = require('mongoose')
const express = require('express')
const app = express()
const route = require('./route/index');
const bodyParser = require('body-parser');
const saveData = require('./route/save');
const readData = require('./route/read');
const deleteData = require('./route/delete');
const updateData = require('./route/update');
const PORT = 3000
const DB = 'mongodb+srv://ShubhamBairagi:Shubham123@cluster0.hymiu.mongodb.net/UsersDetails?retryWrites=true&w=majority'
mongoose.connect(DB)
.then(console.log('Server connected'))
.catch((err)=>{
    console.log(err)
}

)
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(route)
app.use(saveData)
app.use(readData)
app.use(deleteData)
app.use(updateData)

app.listen(PORT, ()=>{
    console.log(`Server is on http://localhost:${PORT}`)
})