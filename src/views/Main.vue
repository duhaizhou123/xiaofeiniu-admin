
<template>
  <div  class="xfn-main-container">
    <el-container>
      <!--侧边导航栏-->
      <el-aside width="200px">
        <el-menu :unique-opened="true" :router="true" :default-openeds="defaultOpeneds" :default-active="defaultActive">
          <!--菜单项1-->
          <el-menu-item v-if="isSuperAdmin" index="/settings">
            <i class="el-icon-setting"></i>
            <b slot="title">全局设置</b>
          </el-menu-item>

          <!--菜单项2-->
          <el-submenu index="table">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <b>桌台管理</b>
            </template>
              <el-menu-item-group>
                <el-menu-item index="/table/list">桌台列表</el-menu-item>
                <el-menu-item index="/table/add">添加桌台</el-menu-item>
                <el-menu-item index="/table/delete">删除桌台</el-menu-item>
              </el-menu-item-group>
          </el-submenu>

          <!--菜单项3-->
          <el-menu-item index="/category/list">
            <i class="el-icon-menu"></i>
            <b slot="title">菜品类别</b>
          </el-menu-item>

          <!--菜单项4-->
          <el-submenu index="dish">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <b>菜品管理</b>
            </template>
              <el-menu-item index="/dish/list">菜品列表</el-menu-item>
              <el-menu-item index="/dish/add">添加菜品</el-menu-item>
          </el-submenu>

          <!--菜单项5-->
          <el-menu-item index="/order/list">
            <i class="el-icon-s-order"></i>
            <b slot="title">订单列表</b>
          </el-menu-item>

          <!--菜单项6-->
          <el-menu-item index="/security">
            <i class="el-icon-user"></i>
            <b slot="title">安全管理</b>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!--顶部信息栏-->
        <el-header height="60px">
          <main-header></main-header>
        </el-header>
        <!--主体部分-->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script>
import MainHeader from '../components/MainHeader'

export default {
  data(){//数据属性
    return{
      isSuperAdmin: sessionStorage.getItem('role') == 2 ? true : false
    }
  },
  computed:{//计算属性=数据属性+操作方法
    defaultOpeneds(){
      if(this.$route.path.indexOf('table')>-1){
        return ['table'];
      }else if(this.$route.path.indexOf('dish')>-1){
        return ['dish'];
      }else{
        return [];
      }
    },

    defaultActive(){
      return this.$route.path;
    }
  },

  components:{
    MainHeader
  },
  //组件创建前判断用户是否登录，未登录跳转至登录界面
  beforeCreate() {
    if (!this.$store.state.adminName) {
      this.$router.push("/login");
    }
  }
};
</script>
    
<style lang="scss">
.xfn-main-container{
  padding: 10px;
}
</style>
