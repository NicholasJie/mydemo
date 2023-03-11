
const express = require('express')
const app = express()

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())


const userRouter = require('./router/user');
app.use('/api', userRouter)

app.listen(3006, function () {
    console.log('Express server running at http://127.0.0.1:3006')
})
