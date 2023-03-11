const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mydemo'
})
db.connect((err) => {
    if (err) {
        console.log('连接失败' + err.stack);
        return;
    }
    console.log('连接成功')
})

// 向外暴露 db
module.exports = db