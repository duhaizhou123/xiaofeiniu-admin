<template>
  <div class="we-chat">
    <span>我想对你说：</span>
    <el-input type="text" v-model="formData.dailog"></el-input>
    <el-button type="primary">发送</el-button>
     
    
  </div>
</template>
 <script>
 export default {
   data(){
     return{
       formData:{
         dailog: ''
       }
     }
   }
 }
 </script>
 
<style scoped lang="scss">
.el-input{
  width: 800px;
}
.we-chat{
  padding: 50px 0px;
}
</style>
