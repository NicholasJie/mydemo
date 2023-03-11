
const express = require('express')
const app = express()

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 响应数据的中间件
app.use((req, res, next) => {
  //  status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const config = require('./config')
// const secretKey = 'itheima No1 ^_^'

const jwt = require('jsonwebtoken')
let expressJWT = require('express-jwt')
app.use(expressJWT.expressjwt({
  secret: config.jwtSecretKey,
  algorithms: ['HS256']
}).unless({ path: [/^\/api\//] }))

const userRouter = require('./router/user');
app.use('/api', userRouter)

const celartcate = require('./router/artcate')
app.use('/art', celartcate)

app.listen(3005, function () {
  console.log('Express server running at http://127.0.0.1:3005')
})
