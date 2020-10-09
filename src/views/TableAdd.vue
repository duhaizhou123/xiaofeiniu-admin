<template>
  <div class="xfn-table-add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加桌台</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="100px" :model="formData" ref="formData" :rules="rules">
      <el-form-item label="桌台编号："> 
        <el-input disabled v-model="formData.tid" class="xfn-tid"></el-input>
        <span class="input-tid-msg">自动生成，无需赋值</span>
      </el-form-item>
      <el-form-item label="桌台别名：" prop="tname">
        <el-input v-model="formData.tname" placeholder="给桌台取个吉利喜庆的名字吧" :clearable="true"></el-input>
      </el-form-item>
      <el-form-item label="桌台类型：" prop="type">
        <el-input v-model="formData.type" placeholder="这是几人桌呢？如8人桌、3-4人桌..."></el-input>
      </el-form-item>
      <el-form-item label="初始状态：">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1" border>空闲</el-radio>
          <el-radio :label="2" border disabled>预定</el-radio>
          <el-radio :label="3" border disabled>占用</el-radio>
          <el-radio :label="4" border disabled>其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit('formData')">保存</el-button>
        <el-button  @click="doReset('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      formData: {tid: '',tname: '',type: '', status: 1},
      rules: {
        tname: [
          {required: true, message: '请输入桌台别名', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请桌台类型', trigger: 'blur'}
        ]

      }
    }
  },
  methods: {
   doSubmit(formName){
      this.$refs[formName].validate((valid) => {//对表单进行校验
          if (valid) {//校验通过，发送异步请求保存新桌台信息
            var url  = this.$store.state.globalSettings.apiUrl + '/admin/table';
            this.$axios.post(url,this.formData).then(({data}) => {
              if(400 == data.code){
                this.$message({
                  showClose: true,
                  message: '您填写的桌台别名已经有了哦！',
                  type: 'message'
                })
              }else if(200 == data.code){
                this.$message({
                  showClose: true,
                  message: '恭喜您，添加桌台成功了！',
                  type: 'success'  
                });
                this.getTableId();
              }   
            }).catch(err => console.log(err)); 
          } else {
            return false;
          }
        });  
    },

    doReset(formName){
      //重置数据
      this.$refs[formName].resetFields();
    },

    //请求新的桌台编号
    getTableId(){
      var url = this.$store.state.globalSettings.apiUrl + '/admin/table/tid';
      this.$axios(url).then(res => {
        this.formData.tid = res.data.tid;
      })
    }
  },
  created(){
    //请求自动生成的桌台编号
    this.getTableId();
  }
}
</script>
 
<style  lang="scss">
  .xfn-table-add{
    .input-tid-msg{
	    color: #888;
	    padding-left: .5em;
    }
    .xfn-tid{
      width: 100px;
    }
  }
</style>
