import axios from "axios";
import Cookies from 'js-cookie';
import qs from 'qs'

var service = axios.create({
  baseURL: 'http://127.0.0.1:3005',
  timeout: 6000000,
});

// request interceptor 请求拦截
service.interceptors.request.use(
  config => {
    // console.log('@@', localStorage.getItem('islogin'))

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    let token = Cookies.get('Token')
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor 响应拦截
service.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data;
    return res;
  },
  error => {
    return Promise.reject(error);
  },
);

export function request({ url, data = {}, method = 'post', }) {
  const LoginStatus = localStorage.LoginStatus_JZ_01;
  if (method == 'get') {
    console.log('get')
    return service({
      url,
      method,
      params: {
        ...data,
      },
    });
  }
  if (method == 'post') {
    return service({
      url,
      method,
      data: qs.stringify({
        ...data,
      })
    });
  }


}
