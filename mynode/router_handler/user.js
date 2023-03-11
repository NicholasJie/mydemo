// 导入数据库操作模块
const db = require('../db/index')

// 引入 bcryptjs
const bcrypt = require('bcryptjs')

// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    console.log('userinfo', userinfo)
    const sql = 'select * from ev_users where username=?'
    // 执行SQL语句并根据结果判断用户名是否被占用
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }

        // 对用户的密码，进行 bcrype加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // 定义插入语句
        const sqlUP = 'insert into ev_users set ?'

        db.query(sqlUP, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 执行语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            // res.send({ status:0,message:'注册成功！'})
            res.cc('注册成功！', 0)
        })

    })


    // res.send('reguser OK')
}

exports.login = (req, res) => {
    // res.send('login OK')
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'

    db.query(sql, userinfo.username, (err, results) => {
        // 执行语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')

        const sqlStr = 'select * from ev_users where password=?'
        // db.query(sqlStr,userinfo.password,(err,results)=>{
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败')
        // if(results.length !==1) return res.cc('密码错误')

        // TODO: 在服务器端生成 Token 的字符串
        const user = { ...results[0], password: '', user_pic: '' }
        // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        console.log(tokenStr)
        // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })

        // res.send({status:0,message:'登录成功'})
        // })


    })
}