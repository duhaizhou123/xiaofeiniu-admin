<template>
  <div class="xfn-dish-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--菜品列表-->
    <el-tabs type="border-card">
      <el-tab-pane v-for="(c,i) in dishList" :key="i">
        <span slot="label">
          <el-badge :value="c.dishList.length" :max="99" class="xfn-dish-list-badge">{{c.cname}}</el-badge>
        </span>

        <el-row>
          <el-col :sm="12" :md="8" :lg="6" :xl="4" v-for="(dish,i) in c.dishList" :key="i">
            <xfn-dish :data="dish"></xfn-dish>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Dish from '../components/Dish'
export default {
  data(){
    return{
      dishList: []  //形如：[{cid: 1, cname: '肉类', dishList:[..]}...]
    }
  },
  mounted(){
    //异步请求菜品列表
    var url = this.$store.state.globalSettings.apiUrl + '/admin/dish';
    this.$axios.get(url).then(res =>  this.dishList = res.data).catch(err => console.log(err))
  },
  components: {
    'xfn-dish' : Dish
  }
}
</script>
   
<style lang="scss">
  .xfn-dish-list {
    .el-badge__content.is-fixed {
	    top: 8px;
	    right: 3px;
    }
  }
  
  
  
</style>
