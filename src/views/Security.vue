<template>
  <div class="xfn-security">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>安全管理</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-row>
      <el-col :md="16" :xs="24">
        <el-card>
          <div slot="header">
            <span>修改用户密码</span>
   
          </div>
          <el-form label-width="100px" :model="formData" ref="formData" :rules="rules" status-icon>
            <el-form-item label="旧密码：" prop="apwd">
              <el-input type="password" v-model="formData.apwd" placeholder="请输入旧密码"></el-input> 
            </el-form-item>
            <el-form-item label="新密码："  prop="newPwd">
              <el-input type="password" v-model="formData.newPwd" placeholder="请输入新密码"></el-input> 
            </el-form-item>
            <el-form-item label="再输一次：" prop="reNewPwd">
              <el-input type="password" v-model="formData.reNewPwd" placeholder="请再输入一次"></el-input> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doSubmit('formData')">保存</el-button>
              <el-button  @click="doReset('formData')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
   
  </div>
</template>
 <script>
 export default {
   data(){
      var validatePass = (rule, value, callback) => {
        if (value !== this.formData.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        formData:{aname: this.$store.state.adminName, apwd: '', newPwd: '', reNewPwd: ''},
        rules: {
          apwd: [
            {
              required: true,
              message: '请输入旧密码',
              trigger: 'blur'
            }
 
          ],
          newPwd: [
            {
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            },
            {
              pattern:/^\d{6,}$/, message: '密码长度不能少于六位字符', 
              trigger: 'blur'
            }
 
          ],
          reNewPwd: [
            {
              required: true,
              message: '请再输入一次新密码',
              trigger: 'blur'
            },
            
            { validator: validatePass, trigger: 'blur' }
 
          ]
        }

      }
    },
    methods: {
      doSubmit(formName){
      this.$refs[formName].validate((valid) => {//对表单进行校验
          if (valid) {//校验通过，发送异步请求保存用户新密码
            var url  = this.$store.state.globalSettings.apiUrl + '/admin';
            this.$axios.patch(url,this.formData).then(({data}) => {
              if(400 == data.code){
                this.$message({
                  showClose: true,
                  message: '您的旧密码输入错误！',
                  type: 'warning'
                })
              }else if(401 ==data.code){
                this.$message({
                  showClose: true,
                  message: '您的密码没有做任何修改哦！',
                  type: 'message'
                })
              }else if(200 == data.code){
                this.$message({
                  showClose: true,
                  message: '恭喜您，修改新密码成功！',
                  type: 'success'  
                });
                this.$refs[formName].resetFields();
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
      }

    }

   
 }
 </script>
 
<style  lang="scss">

</style>
