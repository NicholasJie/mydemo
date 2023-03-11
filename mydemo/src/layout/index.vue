<template>
    <div id="app">
        <!-- 头部 -->
        <!-- <div class="head"> 
            <div class="logo" style="display: flex;  align-items: center; ">
               <div style="font-size: 36px;margin-left: 20px; font-family:sans-serif">自习管理系统</div>
            </div>
        </div> -->
        <!-- 内容 -->
        <div style="display: flex;">
            <!-- left -->
            <div class="left_nav">
                <Listnav></Listnav>
            </div>
            <!-- mian -->
            <div class="mian">
                <AppMain />
            </div>
        </div>
        <!-- 尾部 -->
        <div>

        </div>
    </div>
</template>

<script>
import AppMain from '@/layout/components/AppMain.vue'
import Listnav from '@/layout/components/nav/Listnav.vue';
export default {
    components: {
        Listnav,
        AppMain,
    }
};
</script>

<style lang="less" >
body {
    background-color: aliceblue;
}

#app {
    margin: 0 auto;
    // width: 95vw;
    height: 100vh;
    // border-radius: 20px;
    background-color: #ddd;
    overflow: hidden;
}

.head {}

.left_nav {
    width: 200px;
    height: calc(100vh - 8vh);
    justify-content: center;
}

.mian {
    width: calc(90% - 200px);
    height: 100vh;
    background-color: #ddd;
    padding: 10px;
}
</style>