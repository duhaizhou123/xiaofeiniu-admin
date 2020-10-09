<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
export default {
  mounted(){
    
    //根组件挂载后请求全局设置数据
    var url = this.$store.state.globalSettings.apiUrl+'/admin/setting';
    this.$axios.get(url).then((res)=>{
      //将全局设置数据存储到Vuex存储仓库中
        this.$store.commit('setGlobalSettings',res.data.settings);
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>


<style lang="scss">
  
</style>
