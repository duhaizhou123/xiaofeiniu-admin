<template>
	<div class="xfn-table-info">
		<el-card shadow="hover" style="text-align:center">
			<div class="table" :style="{background: getTableColor(data.status)}">
				{{data.tid}}号桌：{{data.status | tableStatus}}
			</div>
			<el-button type="success" plain size="mini" @click="showTableInfoDialog">详情</el-button>
			<el-button type="primary" plain size="mini" @click="showEditTableStatusDialog">修改</el-button>
			
		</el-card>
    <!--桌台详情对话框-->
		<el-dialog :title="data.tid+'号桌详情'" :visible="isVisibleTableInfoDialog" :before-close="closeTableInfoDialog">
      <!--对话框主体-->
			<el-tabs type="border-card" @tab-click="renderQrcode">
				<el-tab-pane label="桌台状态">
          <el-form label-width="100px" v-if="data.status == 2">
            <el-form-item label="桌台状态：">
              <el-tag type="info">{{data.status | tableStatus}}</el-tag>
            </el-form-item>
            <el-form-item label="预约人：">
              <el-tag type="info">{{reservationDetail.contactName}}</el-tag>
            </el-form-item>
            <el-form-item label="联系时间：">
              <el-tag type="info">{{reservationDetail.contactTime | datetime}}</el-tag>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-tag type="info">{{reservationDetail.phone}}</el-tag>
            </el-form-item>
            <el-form-item label="用餐时间：">
              <el-tag type="info">{{reservationDetail.dinnerTime | datetime}}</el-tag>
            </el-form-item>
            
          </el-form>
          <el-form label-width="100px" v-else-if="data.status == 3">
            <el-form-item label="桌台状态：">
              <el-tag type="info">{{data.status | tableStatus}}</el-tag>
            </el-form-item>
            <el-form-item label="桌台名称：">
              <el-tag type="info">{{data.tname}}</el-tag>
            </el-form-item>
            <el-form-item label="类型：">
              <el-tag type="info">{{data.type}}</el-tag>
            </el-form-item>
            <xfn-order-detail :data="inuseDetail" ></xfn-order-detail>
          </el-form>
          <el-form label-width="100px" v-else>
            <el-form-item label="桌台状态：">
              <el-tag type="info">{{data.status | tableStatus}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
				<el-tab-pane label="桌台二维码"  class="text-center">  
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
    <!--修改桌台状态对话框-->
    <el-dialog :title="data.tid+'号桌状态修改'" :visible="isVisibleEditTableStatusDialog" :before-close="closeEditTableStatusDialog">
      <!--对话框主体-->
      <el-form label-width="100px">
        <el-form-item label="桌台状态：">
          <el-radio-group v-model="status">
            <el-radio :label="1" border>空闲</el-radio>
            <el-radio :label="2" border>预定</el-radio>
            <el-radio :label="3" border>占用</el-radio>
            <el-radio :label="4" border>其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="status == 1"></div>
        <div v-else-if="status == 2">
          <el-form-item label="预定时间：">
            <el-date-picker
            v-model="dinnerTime"
            type="datetime"
            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预约人：">
            <el-input placeholder="预约人" v-model="contactName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input placeholder="请输入预约人电话" v-model="phone"></el-input>
          </el-form-item>
        </div>
        <div v-else-if="status == 3">
          <el-form-item label="用餐人数：">
            <el-input placeholder="用餐人数" v-model="customerCount"></el-input>
          </el-form-item>
          <el-form-item label="用餐时间：">
            <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="详细说明：">
            <el-input type="textarea" placeholder="桌台处于“其他”状态的原因描述" v-model="reason"></el-input>
          </el-form-item>
          
        </div>
      </el-form>
      <!--对话框尾部-->
      <div slot="footer">
        <el-button type="primary" @click="doComit">确定</el-button>
        <el-button  @click="isVisibleEditTableStatusDialog=false">取消</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import OrderDetail from '../components/OrderDetail'
export default {
  
  data() {
    return {
      isVisibleTableInfoDialog: false,
      qrcodeData: '',
      reservationDetail: '',
      inuseDetail: '',
      isVisibleEditTableStatusDialog: false,
      status: this.data.status,
      contactName: '',
      contactTime: '',
      phone: '',
      dinnerTime: new Date(),
      startTime: new Date(),
      customerCount: '',
      reason: '',
      tid: this.data.tid



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
    //打开桌台详请对话框
    showTableInfoDialog() {
      this.isVisibleTableInfoDialog = true;
      var url = this.$store.state.globalSettings.apiUrl;
      if(this.data.status == 2){//请求桌台预定信息
        url +=  `/admin/table/reservation/${this.data.tid}`;
        this.$axios.get(url).then(res => {
          this.reservationDetail = res.data.reservationDetail[0];
        }).catch(err => console.log(err))
        
      }else if(this.data.status == 3){//请求桌台占用信息
        url +=  `/admin/table/inuse/${this.data.tid}`;
        this.$axios.get(url).then(res => {
          this.inuseDetail = res.data.inuseDetail;
        }).catch(err => console.log(err))
       
      }
      
    },
    //关闭桌台详情对话框
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
    //打开修改桌台状态对话框
    showEditTableStatusDialog(){
      this.isVisibleEditTableStatusDialog = true;

    },
    //关闭修改桌台状态对话框
    closeEditTableStatusDialog(){
      this.isVisibleEditTableStatusDialog = false;
    },
    //提交修改桌台信息
    doComit(){
      var formData = {tid: this.data.tid, status: this.status};
      var url = this.$store.state.globalSettings.apiUrl + '/admin/table';
      this.$axios.patch(url,formData).then(res=>{
        if(200 == res.data.code){
          this.$message({
            showClose: true,
            message: '恭喜你，修改桌台状态成功',
            type: 'success'
          });
          this.closeEditTableStatusDialog();
          
          
        }else if(400 == res.data.code){
          this.$message({
            showClose: true,
            message: '亲，你没有做任何修改哦',
            type: 'message'
          }) 
        }
      }).catch(err => console.log(err))
    }

  },
  mounted(){
    
  },
  components:{
    'xfn-order-detail': OrderDetail
  },
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
  .el-tag {
    margin-right: 6px;
  }
  .el-col{
    padding: 5px;
  }
}


</style>


