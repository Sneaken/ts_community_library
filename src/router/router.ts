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
        path: 'account-setting',
        name: 'accountSetting',
        component: () =>
          import('@/components/user-index/views/AccountSetting.vue')
      },
      {
        path: 'appoint-manage',
        name: 'appointManage',
        component: () =>
          import('@/components/user-index/views/AppointManage.vue')
      },
      {
        path: 'current-borrowing-renewing',
        name: 'currentBorrowingRenewing',
        component: () =>
          import('@/components/user-index/views/CurrentBorrowingRenewing.vue')
      },
      {
        path: 'borrowed-history',
        name: 'BorrowedHistory',
        component: () =>
          import('@/components/user-index/views/BorrowedHistory.vue')
      }
    ]
  }
];
export default routes;
