
const express = require('express')
const app = express()

const formidable = require("formidable");
let fs = require('fs')
const request = require('request')
const multer =  require("multer");

// 引入openAi
// const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

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
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json()); // 解析JSON请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码的请求体

const config = require('./config')
// const secretKey = 'itheima No1 ^_^'

// 引入jwt库
const jwt = require('jsonwebtoken')
let expressJWT = require('express-jwt')
app.use(expressJWT.expressjwt({
  secret: config.jwtSecretKey,
  algorithms: ['HS256']
}).unless({ path: [/^(api||public)\//] }))

const userRouter = require('./router/user');
app.use('/api', userRouter)

const celartcate = require('./router/artcate')
app.use('/art', celartcate)


// 上传
const imageVal = require('./router/image')
app.use('/img', imageVal)


app.get('public/image', (req, res) => {
  const path = '/public/uploads/OIP-C.jpg';
  const image = fs.readFileSync(path);
  res.set('Content-Type', 'image/jpeg');
  res.send(image);
});

// 前端获取图片
app.get('/getimage', function (req, res) {
  let data = req.query
  fs.readFile(`./public/uploads/${data.img}`, function (err, data) {
    res.end(data)
  })
})

// const storage = multer.diskStorage({
//   // 目录
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   // 文件名
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// const upload = multer({
//   storage
// })


// 微信公众号

var AppID = 'wx3851479997a78117'
var AppSecret = 'b9dc21b8d8b9389c5a5416630b3d93aa'
var code = ''

app.get('/getCode', (req, res) => {
  var return_uri = 'http://127.0.0.1:3000/getAccessToken'
  var scoped = 'snsapi_userinfo'
  var state = '123'
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scoped + '&state=' + state + '#wechat_redirect')
})

app.get('/getAccessToken', function (req, res) {
  code = req.query.code
  console.log('得到授权码code：', code);
  request.get(
    {
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppID + '&secret=' + AppSecret + '&code=' + code + '&grant_type=authorization_code'
    }, // 请求获取令牌
    function (error, response, body) {
      if (response.statusCode == 200) {
        let data = JSON.parse(body)
        let access_token = data.access_token;
        let openid = data.openid;
        request.get(
          {
            url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN'
          }, // 调用获取用户信息的api
          function (error, response, body) {
            var userinfo = JSON.parse(body);
            console.log(userinfo)
            res.send("\
                            <h1>"+ userinfo.nickname + " 的个人信息</h1>\
                            <p><img src='"+ userinfo.headimgurl + "' /></p>\
                            <p>"+ userinfo.city + "，" + userinfo.province + "，" + userinfo.country + "</p>\
                        ");
          }
        )
      }
    }
  )
})





// app.post('/api/upimage', upload.single('file'), (req, res) => {
//   console.log('req.file', req.file)
//   res.send('ok')
// })


app.listen(3005, function () {
  console.log('Express server running at http://127.0.0.1:3005')
})
