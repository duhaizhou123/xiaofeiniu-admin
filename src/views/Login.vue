<template>
  <el-card class="xfn-login-card">
    <div slot="header">管理员登录</div>
    <el-form label-width="100px" :rules="rules" :model="formData" ref="formData">
      <el-form-item label="管理员名:" prop="aname">
        <el-input placeholder="请输入管理员名：" v-model="formData.aname"></el-input>
      </el-form-item>

      <el-form-item label="登录密码:" prop="apwd">
        <el-input type="password" placeholder="请输入管理员密码：" v-model="formData.apwd" @keyup.enter.native="doEnter"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="doLogin('formData')">登陆</el-button>
        <el-button  @click="doCancel('formData')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>  

<script>
export default {
  data() {
    return {
      formData: {
        aname: "admin",
        apwd: "123456"
      },
      rules: {
        aname: [{ required: true, message: "管理员名不能为空" }],
        apwd: [{ required: true, message: "登录密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(valid => {//对输入框进行非空校验
        if(valid){//校验通过，异步发送登录请求
          var url = this.$store.state.globalSettings.apiUrl + "/admin/login";
          this.$axios
          .post(url, this.formData)
          .then(res => {
            if (200 == res.data.code) {
              //将用户信息存储到Vuex存储仓库中
              this.$store.commit("setAdminName", res.data.user.aname);
              this.$store.commit("setAdminRole", res.data.user.role);


              //记录登录信息
              var url = this.$store.state.globalSettings.apiUrl
              +"/admin/loginInfo";
              var loginData = {
                adminName: this.$store.state.adminName,
                loginTime: new Date().getTime()
              }
              this.$axios.post(url,loginData).then(res=>{
            
              }).catch(err=>{
                console.log(err);
              })

              //跳转至主页面
              this.$router.push("/main");
            } else {
              //登录失败，弹出消息框
              this.$alert("管理员名或密码错误，请重新输入", "登录失败", {
                type: "error",
                confirmButtonText: "确定"
              }).then(() => {
                this.$refs[formName].resetFields();
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          return false;
        }
      })
    },
    doCancel(formName) {
      //清除用户输入
      this.$refs[formName].resetFields();
    },
    
    doEnter(){//管理员密码输入框键入回车时执行登录操作
      this.doLogin('formData');
    }
  }
};
</script>
 
<style lang="scss">
.xfn-login-card {
  width: 450px;
  margin: 100px auto;
  .el-card__header {
    font-size: 1.2rem;
    text-align: center;
  }

}

</style>
