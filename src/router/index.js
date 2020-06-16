import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'
import TableList from '../views/TableList.vue'
import GlobalSettings from '../views/GlobalSettings.vue'
import TableAdd from '../views/TableAdd.vue'
import TableDelete from '../views/TableDelete.vue'
import TableUpdate from '../views/TableUpdate.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import CategoryDelete from '../views/CategoryDelete.vue'
import CategoryUpdate from '../views/CategoryUpdate.vue'
import DishList from '../views/DishList.vue'
import DishAdd from '../views/DishAdd.vue'
import DishDelete from '../views/DishDelete.vue'
import DishUpdate from '../views/DishUpdate.vue'
import OrderList from '../views/OrderList.vue'
import Security from '../views/Security.vue'
import WeChat from '../views/WeChat.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    
  },
  {
    path: '/main',
    component: Main,
    children:[
      {
        path: '',
        redirect: '/table/list'
      },
      {
        path: '/settings',
        component: GlobalSettings
      },
      {
        path: '/table/list',
        component: TableList
      },
      {
        path: '/table/add',
        component: TableAdd
      },
      {
        path: '/table/delete',
        component: TableDelete
      },
      {
        path: '/table/update',
        component: TableUpdate
      },
      {
        path: '/category/list',
        component: CategoryList
      },
      {
        path: '/category/add',
        component: CategoryAdd
      },
      {
        path: '/category/delete',
        component: CategoryDelete
      },
      {
        path: '/category/update',
        component: CategoryUpdate
      },
      {
        path: '/dish/list',
        component: DishList
      },
      {
        path: '/dish/add',
        component: DishAdd
      },
      {
        path: '/dish/delete',
        component: DishDelete
      },
      {
        path: '/dish/update',
        component: DishUpdate
      },
      {
        path: '/order/list',
        component: OrderList
      },
      {
        path: '/security',
        component: Security
      },
      {
        path: '/wechat',
        component: WeChat
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
