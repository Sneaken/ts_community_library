import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Loading, Message } from 'element-ui';
import { ElLoadingComponent } from 'element-ui/types/loading';
import router from '@/router';

let loading: ElLoadingComponent;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading...',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0.7)'
  });
}

function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 加载动画
    startLoading();
    if (localStorage.eleToken) {
      // 配置统一的请求header
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// 响应拦截
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 结束加载动画
    endLoading();
    return response.data;
  },
  (error: any) => {
    endLoading();
    Message.error(error.response);
    // 获取错误状态码
    const { status } = error.response;
    if (status === 401) {
      if (router.currentRoute.path) {
        Message.warning('登录信息过期，请重新登录！');
        localStorage.removeItem('eleToken');
        // router.replace({
        //   name: 'userLogin',
        //   query: { redirect: router.currentRoute.fullPath }
        // });
      } else {
        Message.error('token失效，请重新登录！');
        // 清除token
        localStorage.removeItem('eleToken');
        // 跳转到登录页面
        router.push('/user/login');
      }
    }
    return Promise.reject(error);
  }
);
export default axios;
