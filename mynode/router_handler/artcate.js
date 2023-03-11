// 导入数据库操作模块
const db = require('../db/index')
const fs = require('fs');
const { send } = require('process');
const qs = require('qs')



exports.getArticleCates = (req, res) => {
    console.log('req.auth', req.auth)

    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = `select * from ev_artide_cate where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results,
        })
    })
};

exports.getName = (req, res) => {
    // console.log(req.auth)
    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = `select * from ev_users`
    console.log('sql', sql)
    db.query(sql, (err, results) => {
        console.log(results)
        // 执行sql语句失败
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取个人信息成功',
            data: results,
        })
    })
};

exports.huoqunews = (req, res) => {

    const path = './newsval/config.json';
    // const config = { ip: '192.0.2.1', port: 3000 };



    const userinfo = req.body
    let rss = qs.parse(userinfo)
    let newsarr = []
    rss.newsValue.forEach((element, index) => {
        newsarr.push(element)
    });
    // let ress = [{ ...rss }]
    console.log('前端的数据', userinfo)
    console.log('newsarr', newsarr)
    const sql = `select * from news60 where newsTime =?  `
    db.query(sql, userinfo.newsTime, (err, results) => {
        // if (results.length != 0) {
        //     return res.cc('有数据啦')
        // }

        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                console.log('读取失败')
            } else {
                let arr = JSON.parse(data)
                arr.data.push({ newsTime: userinfo.newsTime, newsValue: newsarr })
                fs.writeFile(path, JSON.stringify(arr, null, 2), (error) => {
                    // 
                    if (error) {
                        console.log('An error has occurred ', error);
                        return;
                    } else {
                        console.log('写入成功')
                    }
                });
            }
        })




        const sql = 'INSERT INTO news60 set ?'
        // db.query(sql, { newsValue: userinfo.newsValue, newsTime: userinfo.newsTime }, (err, results) => {
        //     if (err) return res.cc(err)
        //     // SQL 语句执行成功，但影响行数不为 1
        //     if (results.affectedRows !== 1) {
        //         return res.cc('添加数据失败，请稍后再试！')
        //     }
        //     res.send({
        //         status: 0,
        //         message: '插入信息成功',
        //         data: results,
        //     })
        // })
        // 执行sql语句失败
        // if (err) return res.cc(err)
        // res.send({
        //     status: 0,
        //     message: '获取个人信息成功',
        //     data: results,
        // })
    })
};

exports.getNewsVal = (req, res) => {
    const path = './newsval/config.json';
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log('读取失败')
        } else {
            let arr = JSON.parse(data)
            res.send({
                status: 0,
                message: '获取新闻成功',
                data: arr,
            })

        }
    })
};
