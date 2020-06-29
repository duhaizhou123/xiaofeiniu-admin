<template>
	<div class="xfn-table-info">
		<el-card shadow="hover">
			<div class="table" :style="{background: getTableColor(data.status)}">
				{{data.tid}}号桌：{{data.status | tableStatus}}
			</div>
			<el-button type="success" plain size="small" @click="showTableInfoDialog">详情</el-button>
			<el-button type="primary" plain size="small">修改</el-button>
			
		</el-card>
    <!--桌台详情对话框-->
		<el-dialog :title="data.tid+'号桌详情'" :visible="isVisibleTableInfoDialog" :before-close="closeTableInfoDialog">
      <!--对话框主体-->
			<el-tabs type="border-card" @tab-click="renderQrcode">
				<el-tab-pane label="桌台状态">桌台详情</el-tab-pane>
				<el-tab-pane label="桌台二维码">
          <canvas :id="data.tid"></canvas>
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
      isVisibleTableInfoDialog: false
    };
  },
  props: ["data"],

  methods: {
    getTableColor(status) {
      if (1 == status) return "#67C23A";
      else if (2 == status) return "#E6A23C";
      else if (3 == status) return "#F56C6C";
      else return "#909399";
    },

    showTableInfoDialog() {
      this.isVisibleTableInfoDialog = true;
    },

    closeTableInfoDialog() {
      this.isVisibleTableInfoDialog = false;
    },

		renderQrcode() {
      var qrcode = require('qrcode');
      var canvas = document.getElementById(`${this.data.tid}`);
      // canvas.innerHTML = '';
      //每个桌台对应的URL形如：http://127.0.0.1:8092/#/3
      var tableUrl = this.$store.state.globalSettings.appUrl + '/#/' + this.data.tid;
      console.log(tableUrl);
      //生成二维码
      qrcode.toCanvas(canvas, tableUrl, {
        width: 300,
        errorCorrectionLevel: 'H'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.xfn-table-info {
  padding: 5px;
  text-align: center;
  .table {
    margin: 5px auto;
    width: 90%;
    height: 120px;
    line-height: 120px;
    border: 1px solid #909399;
    border-radius: 50%;
    box-shadow: 7px -3px 8px;
  }
}

.el-card__body {
	padding: 10px;
}
</style>


