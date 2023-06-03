// 导入 express
const express = require('express')
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })
// 创建路由对象
const router = express.Router()



// 获取文章分类的列表数据

const storage = multer.diskStorage({
    // 目录
    destination:function(req,file,cb) {
        cb(null,'./public/uploads')
    },
    // 文件名
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage
})

router.post('/upimage', upload.single('file'), (req,res)=>{
    console.log('req.file', req.body)
    console.log('req.file',req.file)
    res.send('ok')
})


// 向外共享路由对象
module.exports = router