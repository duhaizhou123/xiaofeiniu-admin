<template>
	<div class="xfn-main-header">
		<h3 class="headr-title">{{$store.state.globalSettings.appName}}管理后台</h3>
		<div class="header-right">
			<span class="xfn-user-info">欢迎您：{{$store.state.adminName}}    </span>
			<el-button size="mini" type="primary" round @click="doQuit">退出</el-button>
		</div>
		
	</div>
	
</template>

<script>
export default {
	methods:{
		doQuit(){//退出登录后清除用户信息，跳转至登录页面
			this.$store.commit('setAdminName','');
			this.$router.push('/login');
		}
	}
}
</script>

<style lang="scss">
	$xfn-header-height: 80px;
	.xfn-main-header{
		padding: 0px 10px;
		border-radius: 5px;
		background-color: #DCDFE6;
		line-height: $xfn-header-height;
		height: $xfn-header-height;
		.header-right{
			float: right;
			.xfn-user-info{
				padding: 0px 10px;
			}
		}
		.headr-title{
			margin: 0;
			float: left;
		}

	}
</style>

