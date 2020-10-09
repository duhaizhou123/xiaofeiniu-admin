<template>
  <div class="xfn-order-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    
    </el-breadcrumb>
    <el-table :data="orderList" height="500" border stripe style="width: 100%">
      <el-table-column prop="oid" label="订单编号">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间">
        <template slot-scope="scope">
          {{scope.row.startTime | datetime}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template slot-scope="scope">
          {{scope.row.endTime | datetime}}
        </template>
      </el-table-column>
      <el-table-column prop="customerCount" label="用餐人数">
      </el-table-column>
      <el-table-column prop="tableId" label="桌台编号">
      </el-table-column>
      <el-table-column  label="菜品详情">
        <template slot-scope="scope">
          <el-button @click="showOrderDetailDialog(scope.row.oid)" type="primary" size="small">查看</el-button>
          
          <el-dialog :title="'订单'+oid+'详情'" :visible="isVisibleOderDetailDialog" :before-close="closeOrderDetailDialog">
            <el-form label-width="100px">
              <xfn-order-detail :data="orderDetail"></xfn-order-detail>
            </el-form>
            <!--对话框尾部-->
            <div slot="footer">
              <el-button type="primary" @click="closeOrderDetailDialog">确定</el-button>
              
            </div>
            
          </el-dialog> 
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>
<script>
import OrderDetail from '../components/OrderDetail'
export default {
  data(){
    return {
      orderList: [],
      isVisibleOderDetailDialog: false,
      orderDetail: {},
      oid: ''

    }
  },
  created(){
    var url = this.$store.state.globalSettings.apiUrl + '/admin/order';
    this.$axios.get(url).then(res => {
      this.orderList = res.data.orderList;
    }).catch(err => 
      console.log(err)
    )
  },
  methods: {
    showOrderDetailDialog(oid){
       this.isVisibleOderDetailDialog = true;
       this.oid = oid;
       //查询订单详情
       var url = this.$store.state.globalSettings.apiUrl + `/admin/order/${oid}`;
       this.$axios.get(url).then(res => {
         this.orderDetail = res.data.orderDetail;
       }).catch(err => console.log(err))

    },
    closeOrderDetailDialog(){
      this.isVisibleOderDetailDialog = false;
    }
  },
  components: {
    'xfn-order-detail' : OrderDetail
  }
}
</script>
  
<style   lang="scss">
 
</style>
