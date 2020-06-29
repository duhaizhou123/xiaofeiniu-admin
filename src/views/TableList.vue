<template>
  <div class="xfn-table-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/main'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col v-for="item in tableList" :key="item.tid" :sm="12" :md="8" :lg="6" :xl="4">
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
  mounted(){//页面挂载后向后台请求所有桌台信息
    var url = this.$store.state.globalSettings.apiUrl + '/admin/table';
    this.$axios.get(url).then(res => {
        this.tableList = res.data.tableList;
    }).catch(err => console.log(err))
  },
  components:{
    "xfn-table": Table
  }
}
</script>
   
<style scoped lang="scss">
.xfn-table-list {
  .el-breadcrumb {
    margin: 10px;
  }
}
</style>
