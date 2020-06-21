<template>
  <div class="we-chat">
    <div>
      <span>我想对你说：</span>
      <el-input type="text" v-model="formData.dailog" @keyup.native.space="doKeyup"></el-input>
      <el-button type="primary" @click="send">发送</el-button>
    </div>
    <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
      <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
      <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
      <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
      <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
      <div class="xfn_dailog">
      
      <el-card>
        <div >
          <el-avatar shape="square" :size="50">{{formData.adminName}}</el-avatar>
        <span class="xfn_message">{{formData.dailog}}</span>
      </div>
      </el-card>
    </div>
    
     
    
  </div>
</template>
 <script>
export default {
  data() {
    return {
      formData: {
        dailog: "",
        baseUrl: this.$store.state.globalSettings.apiUrl,
        adminName: this.$store.state.adminName,
        inputTime: ""
      }
    };
  },
  methods: {
    doKeyup() {
      var url = this.formData.baseUrl + "/admin/dailog/drafts";
      var draftData = {
        adminName: this.formData.adminName,
        word: this.formData.dailog,
        inputTime: new Date().getTime()
      };
      this.$axios
        .post(url, draftData)
        .then(res => {
          if (200 == res.data.code) 
          console.log("输入成功");
          else console.log("输入失败");
        })
        .catch(err => console.log(err));
    },

    send() {
      var url = this.formData.baseUrl + "/admin/dailog/message";
      var messageData = {
        adminName: this.formData.adminName,
        message: this.formData.dailog,
        sendTime: new Date().getTime()
      };

      this.$axios
        .post(url, messageData)
        .then(res => {
          if (200 == res.data.code) this.formData.dailog = "";
          else console.log("发送失败");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
 
<style scoped lang="scss">
.el-input {
  width: 800px;
}
.we-chat {
  padding: 50px 0px;
}
.xfn_dailog{
  margin: 20px 50px;
}
.xfn_message{
  margin: 0px 20px;
  
}

</style>
