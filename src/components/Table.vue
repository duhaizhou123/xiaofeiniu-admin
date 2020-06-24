<template>
	<div class="xfn-table-info">
		<el-card shadow="hover">
			<div class="table" :style="{background: getTableColor(data.status)}">
				{{data.tid}}号桌：{{data.status | tableStatus}}
			</div>
			<el-button type="success" plain>详情</el-button>
			<el-button type="primary" plain>修改</el-button>
			
		</el-card>
	</div>
</template>

<script>
export default {
	props: ['data'],

	methods:{
		getTableColor(status){
			if(1 == status) return '#67C23A';
			else if(2 == status) return '#E6A23C';
			else if(3 == status) return '#F56C6C';
			else return '#909399';
		}
	}
}
</script>

<style lang="scss" scoped>
.xfn-table-info{
	padding: 5px;
	text-align: center;
	.table{
		margin: 10px auto;
		width: 90%;
		height: 120px;
		line-height: 120px;
		border: 1px solid #909399;
		border-radius: 50%;
		box-shadow: 7px -3px 8px;
	}
}
</style>


