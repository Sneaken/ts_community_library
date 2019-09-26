import Vue from 'vue'; // 注意要用这一步
import axios from '@/utils/request';
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}
