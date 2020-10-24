import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '',
        redirect: '/table/list'
      },
      {
        path: '/settings',
        component: () => import('../views/GlobalSettings.vue')
      },
      {
        path: '/table/list',
        component: () => import('../views/TableList.vue')
      },
      {
        path: '/table/add',
        component: () => import('../views/TableAdd.vue')
      },
      {
        path: '/table/delete',
        component: () => import('../views/TableDelete.vue')
      },
      {
        path: '/category/list',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: '/dish/list',
        component: () => import('../views/DishList.vue')
      },
      {
        path: '/dish/add',
        component: () => import('../views/DishAdd.vue')
      },
      {
        path: '/order/list',
        component: () => import('../views/OrderList.vue')
      },
      {
        path: '/security',
        component: () => import('../views/Security.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue')
  }
]


const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if('/login' != to.path){
    //判断是否需要登录
    if (sessionStorage.getItem('aname')) {
      next();
    }else{
      next({
        path:"/login"
      });
    }
    
  }else{
    sessionStorage.clear();
    next(); 
  }
});
export default router
