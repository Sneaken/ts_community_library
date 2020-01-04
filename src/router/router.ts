// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from '../views/Home.vue'
//
// Vue.use(Router)
//
// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "about" */ '../views/About.vue')
//     }
//   ]
// })
/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/User/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/User/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/bookInfo/:_id',
    name: 'bookInfo',
    component: () => import('@/views/BookInfo.vue'),
    meta: { title: '图书详情' }
  },
  {
    path: '/bookSearch',
    name: 'bookSearch',
    component: () => import('@/views/BookSearch.vue'),
    meta: { title: '图书搜索列表' }
    // children: [
    //   {
    //     path: '/compensationInquiry',
    //     name: 'CompensationInquiry',
    //     component: () => import('@/views/Index.vue')
    //   }
    // ]
  },
  {
    path: '/user',
    component: () => import('@/views/User/UserIndex.vue'),
    meta: { title: '后台管理系统' },
    children: [
      {
        path: 'accountSetting',
        name: 'accountSetting',
        component: () =>
          import('@/components/user-index/views/AccountSetting.vue')
      },
      {
        path: 'appoint-manage',
        name: 'appointManage',
        component: () =>
          import('@/components/user-index/views/AppointManage.vue')
      }
      // {
      //   path: 'accountSetting',
      //   name: 'accountSetting',
      //   component: () =>
      //     import('@/components/user-index/views/AccountSetting.vue')
      // }
    ]
  }
];
export default routes;
