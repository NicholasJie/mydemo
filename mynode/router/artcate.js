// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)
router.get('/getname', artcate_handler.getName)
router.post('/huoqunews', artcate_handler.huoqunews)
router.get('/getnews', artcate_handler.getNewsVal)

// 向外共享路由对象
module.exports = router