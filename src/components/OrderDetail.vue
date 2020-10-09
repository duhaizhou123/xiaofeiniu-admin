<template>
	<div class="xfn-order-detail" v-cloak>
		
			<el-form-item label="用餐人数：">
        <el-tag type="info">{{data.customerCount}}</el-tag>
      </el-form-item>
      <el-form-item label="下单人：">
        <el-tag type="danger" v-for="(c,i) in  data.customerNames" :key="i">{{c}}</el-tag>
      </el-form-item>
      <el-form-item label="用餐时间：">
        <el-tag type="info">{{data.startTime | datetime}}</el-tag>
      </el-form-item>
      <el-form-item label="已点菜品：">
        <el-row>
          <el-col :span="8" v-for="(c,i) in data.dishs" :key="i">
            <el-card>
              <div class="xfn-dish">
                <img :src="imgBaseUrl + c.imgUrl" :alt="c.title">
                   
                <b>{{c.title}}</b>
                <el-badge class="dish-count" :value="c.dishCount"></el-badge>
              </div>
          	</el-card>
        	</el-col>
        </el-row>
              
      </el-form-item>
		
	</div>
</template>
<script>
export default {
	data(){
		return {
			imgBaseUrl: this.$store.state.globalSettings.apiUrl + '/img/dish/'
		}
	},
	props: ["data"]
}
</script>
<style lang="scss">
	.xfn-order-detail{
		.xfn-dish img{
    	width: 95%;    
  	}
  	.dish-count{
    	margin: 0px 10px;
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
    .xfn-tid{
	    width: 100px;
    }
  }
  [v-cloak]{
	  display: none;
  }

  
</style>

