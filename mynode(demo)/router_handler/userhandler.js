// 导入数据库操作模块
const db = require('../db/index')

exports.sel = (req, res) => {
    // res.send('login OK')
    const sql = 'select * from ev_users'

    db.query(sql, (err, results) => {
        // 执行语句失败
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + results
        })
    })
}