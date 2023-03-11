import { request } from '../until/index$1'


function GetXW(data) {
    return request({ url: 'http://bjb.yunwj.top/php/60miao/qq.php', data, method: 'get' })
}


export default {
    GetXW,
}