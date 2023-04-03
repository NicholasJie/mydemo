<template>
    <div class="bodys">
        <div class="top" style="width:100%;display:flex;flex-wrap: nowrap;">
            <div class="boxclass" style="width: 49%;height: 40vh;">
                <!-- <h1>功能一</h1> -->
                <h1>60秒读懂世界 <el-button v-show="isupNews" @click="huoqunews()">更新新闻</el-button> </h1>
                <div style="width:100%; overflow-y: auto; height: 80%;" v-loading="loadingNews">
                    <div v-for="( item, index) in mynews" :key="index"
                        style="width:100%;  background-color: white;border-radius: 5px;margin-bottom: 5px;  overflow: auto;  display: flex;flex-direction:column;">
                        <div
                            style="width: 97%;margin-top: 15px; margin-left: 15px; font-size: 20px;margin-bottom: 5px;padding-bottom: 2px; ">
                            {{ item }}</div>
                    </div>
                </div>

            </div>
            <div class="boxclass" style="width: 20%;height: 40vh;" v-loading="loading">
                <h1>正在开发</h1>
            </div>
            <div class="boxclass" style="width: 23.7%;height: 40vh;" v-loading="loading">
                <h1>正在开发</h1>
            </div>
        </div>

        <div style="width: 100%;display: flex;flex-wrap: nowrap;">
            <div class="boxclass" style="width: 60%;height: 450px; display: flex;" v-loading="loading">
                <div style="width: 70%;background-color: aqua;height: 100%;"></div>
                <div
                    style="width: 30%;background-color: pink;height: 100%;display: flex;flex-wrap: wrap;margin-bottom: 0px;">
                    <div
                        style="width: 100%;height: 12%;background-color: aquamarine;border-bottom: 1px solid black;padding: 5px;">
                        <div
                            style="display: flex;width: 55px;height: 100%;background-color: black;border-radius: 50px;border: 1px solid white;overflow: hidden;">
                            <img src="../../../../public/image/头像01.webp" alt="">
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="boxclass" style="width: 35%;height: 450px;" v-loading="loading">
                <h1>正在开发111</h1>
            </div>
        </div>



        <!-- <h1 style="margin-left: 20px;">模块一</h1>
        <div style="display: flex;">
            <div v-for="(item, index) in alltims" :key="index" style="display: flex;" class="mokuai">
                <div class="mokuai2">
                    <span>{{ item }}</span>
                </div>
                <span v-if="index % 2 != 0 && index != 5" style="font-size: 22px;">:</span>
            </div>
        </div> -->

    </div>
</template>

<script>
import request$1 from '@/api/getmysql$1'
import request from '@/api/getmysql'
import List2 from './list2.vue'
export default {
    name: 'List',
    data() {
        return {
            times: '',
            alltims: [],
            mynews: '',
            loading: true,
            loadingNews: true,
            isupNews: true,
            Today: '',
        }
    },
    async mounted() {
        await this.getTime()
        await this.getxw()
        // setInterval(this.getTime, 1000);
        //判断是否为登录状态
        if (localStorage.getItem('islogin') != '1') {
            this.$router.push('login')
        }

    },
    methods: {
        // 上传新闻到服务器
        async huoqunews() {
            const lis = await request$1.GetXW()
            console.log('获取到的数据', lis)
            // 获取当前电脑的时间
            let time = new Date();
            // 获取年份
            let year = time.getFullYear();
            // 获取月份 月份：(0~11) + 1
            let month = time.getMonth() + 1;
            // 判断月份是否小于10
            if (month < 10) {
                month = '0' + month
            }
            // 获取日期号
            let day = time.getDate();
            // 判断日期号是否小于10
            if (day < 10) {
                day = '0' + day;
            }
            // 给获取的数据格式化
            let val = []
            if (lis.wb) {
                this.loadingNews = false
                lis.wb.forEach((item) => {
                    console.log(item[0])
                    val.push(item[0])
                })
            }

            let staTime = year + '-' + month + '-' + day
            // console.log("newsValue:" + arrval)
            let ss = await request.UPnews({ newsTime: staTime, newsValue: val })

        },
        // 从服务器获取新闻
        async getxw() {

            let val = []
            let val1 = []
            let lis = await request.Getnews()
            await lis.data.data.forEach(item => {
                console.log('this.Today', this.Today)
                if (item.newsTime == this.Today) {
                    val1 = item.newsValue

                }
            })
            await val1.forEach((item, index) => {
            })
            if (val1) {
                this.loadingNews = false
                this.mynews = val1
            }
        },
        getTime() {
            let dat = new Date()
            let day = dat.getDate()
            let Month = dat.getMonth() + 1
            if (Month < 10) {
                Month = '0' + Month
            }
            let FullYear = dat.getFullYear()
            let Hours = dat.getHours() + ''
            let Min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
            let Seconds = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()
            let allTime = []
            let res = (Hours + Min + Seconds).split('')
            // console.log(res)

            // console.log(res)
            // allTime.push(FullYear)
            // allTime.push(Month)
            // allTime.push(day)
            allTime.push(Hours)
            allTime.push(Min)
            allTime.push(Seconds)
            this.alltims = res
            // console.log(allTime)
            this.Today = FullYear + '-' + Month + '-' + day
            let dates = FullYear + '-' + Month + '-' + day + '-' + Hours + ':' + Min + ':' + Seconds
            this.times = dates
        }

    }
}

</script>

<style lang="less">
.bodys {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
}

.mokuai {
    /* flex-direction:column-reverse; */
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    flex-wrap: wrap;


}

.mokuai2 {
    margin: 0 2px;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 20px;
    height: 20px;
    background-color: #c2c2c2;
    color: aliceblue;
    border-radius: 10px;
    font-size: 28px;
    align-items: center;
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}

.boxclass {
    background-color: #eee;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
}
</style>