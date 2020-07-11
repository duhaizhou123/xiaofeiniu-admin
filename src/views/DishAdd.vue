<template>
  <div class="xfn-dish-add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--添加菜品表单主体-->
    <el-card shadow="never">
      <el-form :model="formData" label-width="150px" ref="formData" :rules="rules">
        <el-form-item label="上传图片：" prop="imgUrl">
          <el-upload class="xfn-uploader" :action="uploadAction" :show-file-list="false" name="dishImg" :before-upload="valiFile" :on-success="doUploadSucc" :on-remove="doRemove">
            <img v-if="imageUrl" :src="imageUrl" class="dishImg">
            <i v-else class="el-icon-plus xfn-uploader-icon"></i>
     
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品类别：" prop="categoryId">
          <el-radio-group v-model="formData.categoryId">
            <el-radio v-for="(c,i) in categoryList" :key="i" border :label="c.cid">{{c.cname}}</el-radio>
            
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜品名称：" prop="title">
          <el-input type="text" style="width:70%" v-model="formData.title" :clearable="true" ></el-input>
        </el-form-item>
        <el-form-item label="菜品描述：" prop="detail">
          <el-input type="textarea" style="width:70%" autosize v-model="formData.detail"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格：" prop="price">
          <el-input type="number" style="width:70%" step="0.01" v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSubmit('formData')">保存</el-button>
          <el-button  @click="doReset('formData')">重置</el-button>

        </el-form-item>
      </el-form>
    </el-card>
    
    
  </div>
</template> 

<script>
export default {
  data() {
    return {
      imageUrl: "",
      uploadAction:
        this.$store.state.globalSettings.apiUrl + "/admin/dish/image",
      categoryList:[],
      formData: {
        title: "",
        imgUrl: "",
        price: "",
        detail: "",
        categoryId: ""
      },
      rules: {
        title: [
          {required: true, message: '请输入菜品名称', trigger: 'blur'}
        ],
        imgUrl: [
          {required: true, message: '请上传菜品图片', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入菜品价格', trigger: 'blur'},
          {pattern:/^[0-9]{1,4}(.[0-9]{1,2})?$/, message: '价格精确到两位小数，不能超过9999.99', trigger: 'blur'}
        ],
        categoryId: [
          {required: true, message: '请选择菜品类别', trigger: 'blur'}
        ],
        detail: [
          {required: true, message: '请输入菜品描述', trigger: 'blur'}
        ],
        


      }
    }
  },
  methods: {
    valiFile(file) {
      //上传图片时对图片格式进行校验
      if (!(file.type === "image/jpeg" || file.type === "image/png")) {
        this.$message.error("亲，只能上传jpg或png格式的图片哦！");
        return false;
      }
      if (!(file.size / 1024 / 1024 < 2)) {
        this.$message.error("亲，上传图片的大小不能超过2MB哦！");
        return false;
      }
      return true;
    },
    
    //上传图片成功后处理函数
    doUploadSucc(res, file) {
      this.formData.imgUrl = res.fileName;
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    doRemove() {
      //处理删除上传图片的操作
      this.formData.imgUrl = "";
      this.imageUrl = "";
    },

    doSubmit(formName){
      this.$refs[formName].validate((valid) => {//对表单进行校验
          if (valid) {//校验通过，发送异步请求保存新菜品信息
            var url  = this.$store.state.globalSettings.apiUrl + '/admin/dish';
            this.$axios.post(url,this.formData).then(({data}) => {
              if(400 == data.code){
                this.$message({
                  showClose: true,
                  message: '您添加的菜品已经有了，不能重复添加哦！',
                  type: 'message'
                })
              }else if(200 == data.code){
                this.$message({
                  showClose: true,
                  message: '恭喜您，添加菜品成功了！',
                  type: 'success'  
                });
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
  },

  mounted(){
    //查询菜品类别信息
    var url = this.$store.state.globalSettings.apiUrl + '/admin/category';
    this.$axios.get(url).then(({data}) => {
      this.categoryList = data;
    })
  }
}
</script>


<style lang="scss">
.xfn-dish-add {
  .el-breadcrumb {
    margin: 10px;
  }
}

.xfn-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 250px;
    height: 177px;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .xfn-uploader-icon {
      font-size: 35px;
      color: #8c939d;
      width: 250px;
      height: 177px;
      line-height: 177px;
      text-align: center;
    }
    .dishImg {
      width: 250px;
      height: 177px;
      display: block;
    }
  }
}
</style>
