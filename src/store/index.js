import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName: '',
    globalSettings: {
      apiUrl: '127.0.0.1:8090'
    }
  },
  mutations: {
    setAdminName(state,value){
      state.adminName = value
    },
    setGlobalSettings(state,value){
      state.apiUrl = value
    }
  },
  actions: {
  },
  modules: {
  }
})
