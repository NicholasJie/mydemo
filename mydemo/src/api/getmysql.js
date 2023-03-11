import { request } from '../until/index'

function GetName(data) {
    console.log('点击了获取按钮')
    return request({ url: '/art/getname', data, method: 'get' });
}

function Login(data) {
    return request({ url: '/api/login', data });
}

function Reguser(data) {
    return request({ url: '/api/reguser', data });
}
function UPnews(data) {
    console.log('接口处数据', data)
    return request({ url: 'http://127.0.0.1:3005/art/huoqunews', data, method: 'post' })
}
function Getnews(data) {
    return request({ url: '/art/getnews', data, method: 'get' })
}




export default {
    GetName, // 获取姓名
    Login,   // 登录
    Reguser, // 注册
    UPnews,  // 添加新闻
    Getnews, // 获取新闻
}