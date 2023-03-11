<template>
    <div style="padding: 10px;">
        <div style="width: ;">
            <el-input v-model="username"></el-input>
            <el-input v-model="password"></el-input>
            <el-button @click="login">登录</el-button>
            <el-button @click="enroll">注册</el-button>
            <el-button @click="huoqu">获取数据</el-button>
            <!-- <el-button @click="getxw">获取新闻</el-button> -->

        </div>
        <p>{{ username }}</p>
        <p>{{ password }}</p>
        <p>姓名是：{{ list }}</p>

    </div>
</template>

<script>
// import request from '../until/index'
import axios from 'axios'
import Cookies from 'js-cookie';
import qs from 'qs'
import request from '../api/getmysql'
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            list: '',
        }
    },
    mounted() { },
    methods: {
        async login() {
            if (this.username == '' || this.password == '') {
                return alert('请输入账号或者密码')
            }
            let vas = await request.Login({ username: this.username, password: this.password })
            console.log('vas', vas)
            if (vas.status == 1) {
                return alert('登录失败，请输入正确的账号密码')
            }
            this.$router.push('/')
            localStorage.setItem('Token', vas.token);
            localStorage.setItem('islogin', '1');
            localStorage.setItem('CurrentUser', this.username);
            Cookies.set('Token', vas.token)

            console.log('vas', vas)
        },
        async enroll() {
            if (!this.username || !this.password) {
                alert('请输入账号或密码')
                return
            }
            let vas = await request.Reguser({ username: this.username, password: this.password })
            if (vas.status) alert(vas.message)
        },
        async huoqu() {
            let val = await request.GetName()
            // this.list = val.data[0].username
            console.log('val', val)
        },
        async getxw() {
            let vas = await request.GetXW()
            console.log(vas)
        }
    }

}
</script>

<style></style>