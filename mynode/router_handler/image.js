const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, './uploads/')
//         },
//         filename: function (req, file, cb) {
//             // fieldname是表单的name值，也就是我们设定的“logo”，
//             // originalname是文件上传时的名字，可以根据它获取后缀，
//             // encoding，mimetype 我就不详细介绍了，可以自行输出查看。
//             const { fieldname, originalname, encoding, mimetype } = file
//             const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '.jpg'
//             cb(null, fieldname + after);
//         }
//     })
// })



exports.upimage = (req, res) => {
    console.log('req',req.body)
    upload.single('logo')
    res.send(req.file)
}