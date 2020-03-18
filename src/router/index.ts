import Vue from 'vue';
import Router, { RawLocation, Route } from 'vue-router';
import routes from './router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: RawLocation): Promise<Route> {
  return ((originalPush.call(this, location) as unknown) as Promise<
    Route
  >).catch((err: any) => err);
};

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
});

// 登陆页面路由 name
const LOGIN_PAGE_NAME: string = 'login';
const REGISTER_PAGE_NAME: string = 'register';
const INDEX_PAGE_NAME: string = 'index';
const allowThroughList: string[] = [LOGIN_PAGE_NAME, REGISTER_PAGE_NAME];

// 跳转之前
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken;
  if (isLogin) {
    // 已登录且要跳转的页面是登录页
    if (to.name === LOGIN_PAGE_NAME) {
      next({
        name: INDEX_PAGE_NAME // 跳转到 index 页
      });
    } else {
      // 其他页
      next();
    }
  } else {
    // 未登录且要跳转的页面是允许跳转的
    if (allowThroughList.includes(to.name as string)) {
      next();
    } else {
      next({
        name: LOGIN_PAGE_NAME
      });
    }
  }
});

// 跳转之后
router.afterEach(to => {});

export default router;
