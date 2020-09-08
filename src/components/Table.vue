<template>
	<div class="xfn-table-info">
		<el-card shadow="hover" style="text-align:center">
			<div class="table" :style="{background: getTableColor(data.status)}">
				{{data.tid}}号桌：{{data.status | tableStatus}}
			</div>
			<el-button type="success" plain size="small" @click="showTableInfoDialog">详情</el-button>
			<el-button type="primary" plain size="small">修改</el-button>
			
		</el-card>
    <!--桌台详情对话框-->
		<el-dialog class="text-center" :title="data.tid+'号桌详情'" :visible="isVisibleTableInfoDialog" :before-close="closeTableInfoDialog">
      <!--对话框主体-->
			<el-tabs type="border-card" @tab-click="renderQrcode">
				<el-tab-pane label="桌台状态">桌台详情</el-tab-pane>
				<el-tab-pane label="桌台二维码">  
          <el-row>
            <el-col class="text-center">
              <img :src="qrcodeData">
            </el-col>
          </el-row>
          <el-row>
            <el-col class="text-center">
              <el-button type="primary" plain size="mini" @click="downloadCodeImg()">下载二维码</el-button>
              <p>提示：请将此二维码打印于对应桌台；顾客扫码即可点餐</p>
            </el-col>
          </el-row>
         
        </el-tab-pane>
        
  		</el-tabs>
        <!--对话框尾部-->
        <div slot="footer">
				  <el-button type="primary" @click="isVisibleTableInfoDialog=false">确定</el-button>
			  </div>
			
		</el-dialog>
	</div>
</template>

<script>
export default {
  data() {
    return {
      isVisibleTableInfoDialog: false,
      qrcodeData: ''
    };
  },
  props: ['data'],

  methods: {
    //根据桌台状态返回桌台颜色
    getTableColor(status) {
      if (1 == status) return '#67C23A';
      else if (2 == status) return '#E6A23C';
      else if (3 == status) return '#F56C6C';
      else return '#909399';
    },

    showTableInfoDialog() {
      this.isVisibleTableInfoDialog = true;
    },

    closeTableInfoDialog() {
      this.isVisibleTableInfoDialog = false;
    },

    //生成桌台二维码
		renderQrcode() {
      var qrcode = require('qrcode');
      //每个桌台对应的URL形如：http://127.0.0.1:8092/#/3
      var tableUrl = this.$store.state.globalSettings.appUrl + '/#/' + this.data.tid;
      
      //把绘制得到的二维码二进制数据转换为Base64编码的字符串
      qrcode.toDataURL(tableUrl, {
        width: 300,
        errorCorrectionLevel: 'H'
      }, (err, url)=>{   
        this.qrcodeData = url;
      });
    },

    //下载二维码
    downloadCodeImg(){
      var a = document.createElement('a')
      a.download = `${this.data.tid}号桌二维码`
      // 设置图片地址
      a.href = this.qrcodeData;
      a.click();
    },

  }
};
</script>

<style lang="scss">
.xfn-table-info {
  padding: 5px;
  .table {
    margin: 5px auto;
    width: 90%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid #909399;
    border-radius: 50%;
    box-shadow: 7px -3px 8px;
  }
  .el-card__body {
	  padding: 5px;
  }
  
}


</style>


