<template>
  <div class="xfn-table-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col v-for="item in tableList" :key="item.tid" :xs="12" :sm="8" :md="6" :lg="4">
        <xfn-table :data="item"></xfn-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "../components/Table";
export default {
  data(){
    return{
      tableList: []
    }
  },
  methods: {
    
  },
  created(){//页面挂载后向后台请求所有桌台信息
    this.$axios.get('/admin/table').then(res => {
        this.tableList = res.data.tableList;
    }).catch(err => console.log(err))
  },
  components:{
    'xfn-table': Table
  }
}
</script>
   
<style lang="scss">

</style>
