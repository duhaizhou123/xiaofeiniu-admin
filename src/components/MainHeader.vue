<template>
	<div class="xfn-main-header">
		<h3 class="headr-title">{{$store.state.globalSettings.appName}}管理后台</h3>
		<div class="header-right">
			<span class="xfn-user-info">欢迎回来：{{$store.state.adminName}}    </span>
			<span class="xfn-user-info">角色：{{$store.state.adminRole | role}}    </span>
			<el-button size="mini" type="primary" round @click="doQuit">退出</el-button>
		</div>
		
	</div>
	
</template>

<script>
export default {
	methods:{
		doQuit(){//退出登录后清除用户信息，跳转至登录页面
			var url = this.$store.state.globalSettings.apiUrl + '/admin/loginOut'
			this.$axios.get(url).then((res)=>{
				this.$router.push('/login');
			}).catch(err => console.log(err))
			;
		}
	}
}
</script>

<style lang="scss">
	$xfn-header-height: 80px;
	.xfn-main-header{
		padding: 0px 20px;
		border-radius: 5px;
		text-align: right;
		background-color: #DCDFE6;
		line-height: $xfn-header-height;
		height: $xfn-header-height;
		.xfn-user-info{
			padding: 0px 20px 0px 0px;
		}
		.headr-title{
			margin: 0;
			float: left;
		}

	}
</style>

