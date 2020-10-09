<template>
  <div class="xfn-table-delete">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>删除桌台</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="100px" :model="formData" ref="formData" :rules="rules" @submit.native.prevent>
      <el-form-item label="桌台编号" prop="tid">
        <el-input class="xfn-tid" v-model="formData.tid" placeholder="请输入要删除的桌台编号" ></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="doSubmit('formData')">提交</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formData: {
        tid: ''
      },
      rules: {
         tid: [
          {required: true, message: '请输入要删除的桌台编号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    doSubmit(formName){
      this.$refs[formName].validate((valid) => {//对表单进行校验
        if (valid) {//校验通过，发送异步请求删除桌台
          this.$confirm("亲，删除后将无法恢复, 你确定要删除该桌台?", "高危提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(()=>{
            var url  = this.$store.state.globalSettings.apiUrl + `/admin/table/${this.formData.tid}`;
            this.$axios.delete(url).then(({data}) => {
              if(400 == data.code){
                this.$message({
                  showClose: true,
                  message: '您要删除的桌台不存在或已被删除！',
                  type: 'message'
                })
              }else if(200 == data.code){
                this.$message({
                  showClose: true,
                  message: '恭喜您，删除桌台成功了！',
                  type: 'success'  
                });
                this.formData.tid = '';
              }   
            }).catch(err => console.log(err)); 
          }).catch(()=>{

          })
            
        } else {
           return false;
        }
      }) 
    }

  }
}
</script>
 
<style lang="scss">
.xfn-table-delete{
  .xfn-tid{
    width:200px;
  }
}
</style>
