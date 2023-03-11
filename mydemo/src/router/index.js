
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

import Layout from '../layout';
// import Listnav from '../layout/components/nav'; // 左侧导航栏
import List from '../layout/components/AppMain/list'; // 选项一
import List2 from '../layout/components/AppMain/list2'; // 选项二
import Login from '../components/login'
// 创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/login',
			component:Login,
			name:"Login"
		},
		{
			path: "/",
			component: Layout,
			name:"Layout",
			redirect:'/home',
			children:[
			{
				path: "Home",
				component: List,
				name:"Home",
			},
			{
				path: "List2",
				component: List2,
				name:"List2",
			},
			]
		},
		

	]
})

//暴露router
export default router