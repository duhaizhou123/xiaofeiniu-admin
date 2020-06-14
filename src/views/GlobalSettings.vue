<template>
  <div>
    <el-breadcrumb class="xfn-settings-card" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <el-form label-width="120px">
        <el-form-item label="应用名称：">
          <el-input v-model="formData.appName"></el-input>
        </el-form-item>
        <el-form-item label="数据API地址：">
          <el-input v-model="formData.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="管理后台地址：">
          <el-input v-model="formData.adminUrl"></el-input>
        </el-form-item>
        <el-form-item label="顾客APP地址：">
          <el-input v-model="formData.appUrl"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号：">
          <el-input v-model="formData.icp"></el-input>
        </el-form-item>
        <el-form-item label="版权声明：">
          <el-input v-model="formData.copyRight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doCommit">提交</el-button>
          <el-button @click="doCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      formData: {
        appName: this.$store.state.globalSettings.appName,
        apiUrl: this.$store.state.globalSettings.apiUrl,
        adminUrl: this.$store.state.globalSettings.adminUrl,
        appUrl: this.$store.state.globalSettings.appUrl,
        icp: this.$store.state.globalSettings.icp,
        copyRight: this.$store.state.globalSettings.copyRight
      }
    };
  }
  
};
</script>
  
<style scoped lang="scss">
.xfn-settings-card {
  margin: 10px;
}
</style>
