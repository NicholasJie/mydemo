<template>
    <div class="app">
        <div class="nav">
            <div class="logo">
                <div style="" class="headPortrait"> </div>
            </div>

            <div class="nav_mian">
                <router-link class="box" tag="div" to="/">
                    <div @click="iconclass('1')" style="">
                        <i class="el-icon-house iconval iconcolorone" :style="
                            iconNum == 1
                                ? { color: '#F56C6C' } : { color: '#eee' }"></i>
                    </div>
                </router-link>

                <router-link class="box" tag="div" to="/List2">
                    <div @click="iconclass('2')" style="">
                        <i class="el-icon-reading iconcolorone" :style="
                            iconNum == 2
                                ? { color: '#F56C6C' } : { color: '#eee' }"></i>
                    </div>
                </router-link>

                <router-link class="box" tag="div" to="List2">
                    <div @click="iconclass('3')" style="">
                        <i class="el-icon-alarm-clock iconcolorone" :style="
                            iconNum == 3
                                ? { color: '#F56C6C' } : { color: '#eee' }"></i>
                    </div>
                </router-link>

                <router-link class="box" tag="div" to="login">
                    <div @click="iconclass('4')" style="">
                        <i class="el-icon-switch-button iconcolorone " :style="
                            iconNum == 4
                                ? { color: '#F56C6C' } : { color: '#eee' }"></i>
                    </div>
                </router-link>
            </div>

            <div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'Listnav',
    data() {
        return {
            iconNum: 1,
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        iconclass(value) {
            this.iconNum = value
            console.log(this.iconNum)
            if (value == '4') {
                localStorage.removeItem('islogin')
            }
        },

    },
    created() {

    }
}

</script>

<style scoped lang="less">
.app {
    display: flex;

    .nav {
        position: relative;
        margin-top: 50px;
        left: 40px;
        overflow: hidden;
        background-color: rgb(30, 31, 32);
        border-radius: 20px;
        width: 70%;
        height: 90vh;
        display: flex;
        flex-direction: column; // 主轴的方向 从上到下
        justify-content: space-around; // 内容居中
        align-items: center
    }

    .iconcolor {
        color: red;
    }

    .iconcolorone {
        color: aliceblue;
    }

    .logo {
        margin-top: 2px;
    }

    .nav_mian {
        display: flex;
        flex-direction: column; // 主轴的方向 从上到下
        height: 50%;
        border-radius: 20px;
        overflow: hidden;
        // border: 1px solid;
        justify-content: space-around; // 内容居中

        .box {
            font-size: 30px;
            width: 100%;
            height: 60px;
            border-radius: 30px;

            // margin-left: 20px;
            // background-color: aliceblue;
            p {
                margin-top: 8px;
                margin-left: 15px;
                margin: 0 auto;
            }

            .iconval {
                // margin: 0 auto;
                // margin-left: 6px;
            }

        }
    }

}

.headPortrait {
    width: 80px;
    height: 80px;
    border: 1px solid white;
    border-radius: 50px;
    overflow: hidden;
    background-image: url(../../../../public/image/头像01.webp);
    background-size: cover;
}
</style>