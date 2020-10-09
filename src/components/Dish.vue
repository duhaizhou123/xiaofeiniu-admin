<template>
	<div class="xfn-dish">
		<el-card shadow="hover">
			<el-form>
				<el-form-item>
					<div class="dish">
						<img :src="imgBaseUrl +data.imgUrl" :alt="data.title">
						<h3>{{data.title}}</h3>
						<div class="mask">
							<h3>{{data.title}}</h3>
							<b>{{data.detail}}</b>
							<p>价格：{{data.price | currency}}</p>
						</div>
					</div>
					
					
				</el-form-item>
				<div class="text-center dish-footer">
					<el-button size="small" type="primary" plain @click="showEditDishDialog">修改</el-button>
					<el-button size="small" type="danger" plain @click="doDelete">删除</el-button>
				</div>
			</el-form>
		</el-card>
		<el-dialog :visible="isShowEditDishDialog" :before-close="closeEditDishDialog" title="菜品信息修改页面">
      <el-form :model="formData" label-width="150px" ref="formData" :rules="rules">
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
		</el-dialog>
	</div>
</template>
<script>
export default {
	data(){
		return{
			imgBaseUrl: this.$store.state.globalSettings.apiUrl + '/img/dish/',
			isShowEditDishDialog: false,
			formData: {
				did: this.data.did, 
				title: this.data.title, 
				detail: this.data.detail, 
				price: this.data.price
			},
			rules: {
        title: [
          {required: true, message: '请输入菜品名称', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入菜品价格', trigger: 'blur'},
          {pattern:/^[1-9][0-9]{1,3}(.[0-9]{1,2})?$/, message: '价格精确到两位小数，不能超过9999.99', trigger: 'blur'}
        ],
        detail: [
          {required: true, message: '请输入菜品描述', trigger: 'blur'}
        ]
      }
		}
	},
	props: ['data'],
	
	methods: {
		//删除菜品
		doDelete(){
			this.$confirm('亲，删除后将无法恢复, 你确定要删除该菜品?','高危提示',{
				confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
			}).then(() => {
				var url = this.$store.state.globalSettings.apiUrl + `/admin/dish/${this.data.did}`;
				this.$axios.delete(url).then(res => {
					if(200 == res.data.code){
						this.$message({
							showClose: true,
							message: '亲，删除菜品成功',
							type: 'success'
						});
					}else{
						this.$message({
							showClose: true,
							message: '亲，该菜品不存在或已被删除',
							type: 'info'
						})
					}
				}).catch(err => 
					console.log(err)
				)
			}).catch(() => {

			})
		},
		closeEditDishDialog(){
			this.isShowEditDishDialog = false;

		},
		showEditDishDialog(){
			this.isShowEditDishDialog = true;
		},
		//提交修改信息
		doSubmit(formName){console.log(this.formData);
			this.$refs[formName].validate((valid) => {//对表单进行校验
				if(valid){//校验通过发送请求保存修改后菜品信息
					var url = this.$store.state.globalSettings.apiUrl + '/admin/dish';
					this.$axios.put(url,this.formData).then(res => {
						if(400 == res.data.code){
							this.$message({
								showClose: true,
								message: '您没做任何修改哦！',
								type: 'message'
							})
						} else if(200 == res.data.code){
							this.$message({
								showClose: true,
								message: '恭喜您修改菜品信息成功！',
								type: 'success'
							});
							this.closeEditDishDialog();
						} else {
							this.$message({
								showClose: true,
								message: '您修改的菜品不存在或已被删除了！',
								type: 'message'
							})
						}
					}).catch(err => console.log(err))

				} else {
					return false;
				}
			})
		},
		//重置表单
		doReset(formName){
			this.$refs[formName].resetFields();
		}
	}
}
</script>
<style lang="scss">
.xfn-dish{
	padding: 5px;
	.dish{
		position: relative;
		overflow: hidden;
		img{
			display: block;
			width: 100%;
		}
		h3 {
			position: absolute;
			top: -12px;
			color: #fff;
			margin: 5px;
		}
	}
	
	.mask{
		display: none;
		position: absolute;
		top: 0;
		width: 95%;
		height: 91%;
		background: rgba(0,0,0,.6);
		padding: 8px 6px;
		h3{
			color: #e00;
			margin: 3px -2px;
		}
		b{
			color: #eee;
			font-size: 1em;
			margin: 12px;
		}
		p{
			position: absolute;
			right: 1em;
			bottom: -1em;
			color: #fe0;
		}
		
	}
	
	
	.el-card__body {
	  padding: 5px;
	}
	.el-card__header{
		padding: 5px;
	}
	.dish-footer{
		margin: -12px 0px 5px 0px;
	}
}
.xfn-dish :hover{
	h3{
		display: none;
	}
	.mask {
		display: block;
		h3{
			display: block;	
		}
	}
}
</style>

