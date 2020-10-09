<template>
  <div class="xfn-category-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品类别管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button plain type="primary" size="mini"  icon="el-icon-plus"  @click="addCategory">添加菜品类别</el-button>
    
    <el-table :data="categoryList" border stripe style="width: 1000px">
    <el-table-column
      prop="cid"
      label="编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="cname"
      label="菜品类别名称"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="300">
      <template slot-scope="{row,$index}">
        <el-button @click="modifyCategory(row,$index)" type="success" size="mini">修改</el-button>
        <el-button @click="deleteCategory(row,$index)"   type="danger" size="mini" >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      categoryList: []
    };
  },
  methods: {
    //添加菜品类别
    addCategory() {
      this.$prompt("请输入菜品名称：", "添加菜品类别", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.{1,}/,
        inputErrorMessage: "亲，菜品类别名称不能为空"
      }).then(({ value }) => {
          var url = this.$store.state.globalSettings.apiUrl + "/admin/category";
          this.$axios.post(url, { cname: value }).then(res => {
            if (200 == res.data.code) {//在数据库添加菜品成功
              //在页面列表中添加该菜品类别
              this.categoryList.push({cname:value, cid: res.data.cid});
              this.$message({
                showClose: true,
                message: "恭喜你，添加菜品成功",
                type: "success"
              });
            } else if(400 == res.data.code){
              this.$message({
                showClose: true,
                message: "该菜品已经有了，不能重复添加哦",
                type: "info"
              });
            }else{
              this.$message({
                showClose: true,
                message: "亲，菜品添加失败了",
                type: "warning"
              });
            }
          });
        }).catch(() => {});
    },

    //修改菜品类别
    modifyCategory(c,i) {
      this.$prompt('请输入新的菜品类别名称：', '修改菜品类别',{
        onfirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.{1,}/,
        inputErrorMessage: "亲，菜品类别名称不能为空",
        inputValue: c.cname
      }).then(({ value })=>{
        var url = this.$store.state.globalSettings.apiUrl + '/admin/category';
        var data = {cid: c.cid, cname: value};
        this.$axios.put(url,data).then((res,err)=>{
          if(200 == res.data.code){//在数据库修改成功
            //在表格中修改该菜品类别
            this.categoryList[i].cname = value;
            this.$message({
              showClose: true,
              type: "success",
              message: "恭喜你，菜名类别名称修改成功了"
            });

          }else if(401 == res.data.code){
            this.$message({
              showClose: true,
              type: "info",
              message: "亲，你没有做任何修改哦"
            });
          }else{
            this.$message({
              showClose: true,
              type: "error",
              message: "亲，修改菜品类别名称失败了"
            });
          }
        }).catch(err => console.log(err))
      }).catch(() => {})
    },

    //删除菜品类别
    deleteCategory(c, i) {
      var url =
        this.$store.state.globalSettings.apiUrl + `/admin/category/${c.cid}`;

      this.$confirm("亲，删除后将无法恢复, 你确定要删除该类别?", "高危提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(url)
            .then(res => {
              if (200 == res.data.code) {
                //在数据库中删掉该菜品类别成功
                //在表格中删除该菜品类别
                this.categoryList.splice(i, 1);
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "恭喜你，删除成功了!"
                });
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: "亲，删除失败了"
                });
              }
            }).catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    }
  },

  mounted() {
    var url = this.$store.state.globalSettings.apiUrl + "/admin/category";
    this.$axios
      .get(url)
      .then(res => this.categoryList = res.data)
      .catch(err => console.log(err));
  }
};
</script>


<style lang="scss">
.xfn-category-list>.el-button{
    margin: 0px 0px 15px 0px;
  }
</style>
