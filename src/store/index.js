import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//Vuex仓库中存储的数据赋值时先从sessionStorage中取值，如果sessionStorage中不存在再赋初始值，以解决呢页面刷新返回首页问题
    adminName: sessionStorage.getItem('aname') || '',
    adminRole: sessionStorage.getItem('role') || '',
    globalSettings:  {
      apiUrl: sessionStorage.getItem('apiUrl') ||'http://127.0.0.1:8090',
      appName: sessionStorage.getItem('appName') ||'',
      adminUrl: sessionStorage.getItem('adminUrl') ||'',
      appUrl: sessionStorage.getItem('appUrl') ||'',
      icp: sessionStorage.getItem('icp') ||'',
      copyright: sessionStorage.getItem('copyright') ||''
    }
  },
  mutations: {
    setAdminName(state,value){
      sessionStorage.setItem('aname',value)
      state.adminName = value
    },
    setAdminRole(state,value){
      sessionStorage.setItem('role',value)
      state.adminRole = value
    },
    setGlobalSettings(state,value){
      sessionStorage.setItem('appName',value.appName)
      sessionStorage.setItem('apiUrl',value.apiUrl)
      sessionStorage.setItem('adminUrl',value.adminUrl)
      sessionStorage.setItem('appUrl',value.appUrl)
      sessionStorage.setItem('icp',value.icp)
      sessionStorage.setItem('copyright',value.copyright)
      state.globalSettings = value
    }
  },
  actions: {
  },
  modules: {
  }
})
