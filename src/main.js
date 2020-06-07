import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)  //注册ElementUI插件
Vue.prototype.$axios = axios  //把axios设置为所有Vue组件实例的成员属性，以后可以直接使用this.$axios发送异步请求
Vue.config.productionTip = false

//创建全局过滤器
Vue.filter('date',(val)=>{
  //把bigint转换为：yyyy-mm-dd
  var date = new Date(val)
  var yyyy = date.getFullYear()
  var mm = date.getMonth()+1
  mm = mm>9 ? mm : '0'+mm

  var dd = date.getDate()
  dd = dd>9 ? dd : '0'+dd
  return yyyy+'-'+mm+'-'+dd
})

Vue.filter('datetime',(val)=>{
  //把bigint转换为：yyyy-mm-dd hh:mm:ss
  var date = new Date(val)
  var yyyy = date.getFullYear()
  var mm = date.getMonth()+1
  mm = mm>9 ? mm : '0'+mm

  var dd = date.getDate()
  dd = dd>9 ? dd : '0'+dd

  var hh = date.getHours()
  hh = hh>9 ? hh : '0'+hh

  var mi = date.getMinutes()
  mi = mi>9 ? mi : '0'+mi
  
  var ss = date.getSeconds()
  ss = ss>9 ? ss : '0'+ss

  return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss
})

Vue.filter('currency',(val)=>{
  //把int转换为：¥ xx.00
  return '¥'+val.toFixed(2)
})

Vue.filter('tableStatus',(val)=>{
  //把数字转化为桌台状态
  switch(val){
    case 1:
      return '空闲'
      break;
    case 2:
      return '预定'
      break;
    case 3:
      return '占用'
      break;
    default:
      return '其他'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
