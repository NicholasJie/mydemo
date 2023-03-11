<template>
    <div class="bodys">
        <div class="top" style="width:100%;display:flex;flex-wrap: nowrap;">
            <div class="boxclass" style="width: 49%;height: 500px;">
                <!-- <h1>功能一</h1> -->
                <h1>60秒读懂世界 <el-button @click="huoqunews()">登录</el-button> </h1>
                <div style="width:100%; overflow-y: auto; height: 80%;" v-loading="loadingNews">
                    <div v-for="( item, index) in mynews" :key="index"
                        style="width:100%;  background-color: white;border-radius: 5px;margin-bottom: 5px;  overflow: auto;  display: flex;flex-direction:column;">
                        <div
                            style="width: 97%;margin-top: 15px; margin-left: 15px; font-size: 20px;margin-bottom: 5px;padding-bottom: 2px; ">
                            {{ item }}</div>
                    </div>
                </div>

            </div>
            <div class="boxclass" style="width: 20%;height: 500px;" v-loading="loading">
                <h1>正在开发</h1>
            </div>
            <div class="boxclass" style="width: 23.7%;height: 500px;" v-loading="loading">
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
                <h1>正在开发</h1>
            </div>
        </div>



        <!-- <h1 style="margin-left: 20px;">模块一</h1>
        <div style="display: flex;">
            <div v-for="(item,index) in alltims" :key="index" style="display: flex;" class="mokuai"  >
            <div class="mokuai2">
                <span>{{item}}</span>
            </div>
            <span v-if="index % 2 !=0 && index != 5" style="font-size: 22px;">:</span>
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
        }
    },
    mounted() {
        this.getxw()
        this.getTime()
        setInterval(this.getTime, 1000);
        //判断是否为登录状态
        if (localStorage.getItem('islogin') != '1') {
            this.$router.push('login')
        }

    },
    methods: {
        // 上传新闻到服务器
        async huoqunews() {
            // const lis = await request$1.GetXW()
            // console.log('获取到的数据', lis)
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

            let val = []
            // if (lis.wb) {
            //     this.loadingNews = false
            //     lis.wb.forEach((item) => {
            //         console.log(item[0])
            //         val.push(item[0])
            //     })
            //     console.log('foreach后的数据', val)
            // }
            let news = ['1、3月8日，外交部例行记者会上有记者提问有报道称美众议长将在美见蔡英文，中方有何评论？毛宁表示：已向美方提出严正交涉，要求美方作出澄清。',
                '2、3月8日，全国人大代表黄超建议合理建构平台用工劳动基准，推进骑手权益保障标准化。专送骑手应保证每周至少一天，休息时间应为强制，系统不予派单。',
                '3、全国两会期间，来自不同战线领域的女代表、女委员相继在“代表通道”“委员通道”中讲述心声，她们的建言，为这次年度盛会增添了一抹抹靓丽的风采。',
                '4、湖北现购车狂潮',
                '5、3月7日，山东青岛。空乘专业学生早起参加千人面试，排队七小时，面试3分钟。据当事人介绍，早上七点多到达指定地点，到下午两点半左右才进入面试。',
                '6、高三老师被安排同学生一起考试',
                '7、近日，云南网友晒自家养的黑猪，因身形健硕，肌肉发达，被不少网友戏称为“健身猪”。据了解，这类猪叫做杜洛克猪，一头最高能卖到8万元。',
                '8、近日，美国白宫新闻秘书卡琳·让-皮埃尔在记者会上回应提问时多次强调，拜登总统对中国的态度没有改变。她强调美方不寻求冲突，并尊重一个中国政策。',
                '9、近日，记者接到了来自余杭的汤大姐的求助。汤大姐今年53岁，退休后的她和老伴花费两百多万，在老家盖了一栋别墅准备养老，他们想招募抱团养老的伙伴。',
                '10、杭州法喜寺500岁玉兰盛放',
                '11、浓眉被打出血',
                '12、大熊猫着急下班哐哐敲铁门',
                '13、深度“悦己”成女性消费趋势',
                '14、近日，北京法庭公布一起离婚纠纷案。男方称仅剩10万存款，调查后发现其年收入高达300万，而妻子毫不知情。最终，法院判女方分60%财产。',
                '15、两会期间，记者进行随机街访，和大家谈谈工作的事。其中谈到理想工作，有人想当老板，有人想捡垃圾，有人啥也不想干。\n']
            console.log('新闻', news[news.length - 1])
            // let arrval = [{ 1: '3月8日，外交部例行记者会上有记者提问有报道称美众议长将在美见蔡英文，中方有何评论？毛宁表示：已向美方提出严正交涉，要求美方作出澄清。' },
            // { 2: '3月8日，全国人大代表黄超建议合理建构平台用工劳动基准，推进骑手权益保障标准化。专送骑手应保证每周至少一天，休息时间应为强制，系统不予派单。' },
            // { 3: '全国两会期间，来自不同战线领域的女代表、女委员相继在“代表通道”“委员通道”中讲述心声，她们的建言，为这次年度盛会增添了一抹抹靓丽的风采。' },
            // { 4: '湖北现购车狂潮' },
            // { 5: '3月7日，山东青岛。空乘专业学生早起参加千人面试，排队七小时，面试3分钟。据当事人介绍，早上七点多到达指定地点，到下午两点半左右才进入面试。' },
            // { 6: '高三老师被安排同学生一起考试' },
            // { 7: '近日，云南网友晒自家养的黑猪，因身形健硕，肌肉发达，被不少网友戏称为“健身猪”。据了解，这类猪叫做杜洛克猪，一头最高能卖到8万元。' },
            // { 8: '近日，美国白宫新闻秘书卡琳·让-皮埃尔在记者会上回应提问时多次强调，拜登总统对中国的态度没有改变。她强调美方不寻求冲突，并尊重一个中国政策。' },
            // { 9: '近日，记者接到了来自余杭的汤大姐的求助。汤大姐今年53岁，退休后的她和老伴花费两百多万，在老家盖了一栋别墅准备养老，他们想招募抱团养老的伙伴。' },
            // { 10: '杭州法喜寺500岁玉兰盛放' },
            // { 11: '浓眉被打出血' },
            // { 12: '大熊猫着急下班哐哐敲铁门' },
            // { 13: '深度“悦己”成女性消费趋势' },
            // { 14: '近日，北京法庭公布一起离婚纠纷案。男方称仅剩10万存款，调查后发现其年收入高达300万，而妻子毫不知情。最终，法院判女方分60%财产。' },
            // { 15: '两会期间，记者进行随机街访，和大家谈谈工作的事。其中谈到理想工作，有人想当老板，有人想捡垃圾，有人啥也不想干。' }
            // ];
            let staTime = year + '-' + month + '-' + day
            // console.log("newsValue:" + arrval)
            let ss = await request.UPnews({ newsTime: staTime, newsValue: news })

        },
        // 从服务器获取新闻
        async getxw() {
            let val = []
            let val1 = []
            let lis = await request.Getnews()
            await lis.data.data.forEach(item => {
                if (item.newsTime == '2023-03-09') {
                    console.log(item)
                    val1 = item.newsValue

                }
            })
            await val1.forEach((item, index) => {
                console.log(index, item)
            })
            console.log('list', val1)
            if (val1) {
                this.loadingNews = false
                this.mynews = val1
            }
        },
        getTime() {
            let dat = new Date()
            let day = dat.getDate()
            let Month = dat.getMonth()
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