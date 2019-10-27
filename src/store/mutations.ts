import * as types from './mutation-types';
import { StateInterface, UserInterface } from '@/store/state.interface';

// 管理同步
const mutations = {
  [types.SET_AUTHENTICATED](state: StateInterface, isAuthenticated: boolean) {
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    } else {
      state.isAuthenticated = false;
    }
  },
  [types.SET_USER](state: StateInterface, user: UserInterface) {
    if (user) {
      state.user = user;
    } else {
      state.user = {
        component: '',
        exp: 0,
        iat: 0,
        username: '',
        phone: '',
        email: ''
      };
    }
  },
  [types.UPDATE_USER](
    state: StateInterface,
    object: {
      attribute: string;
      data: string;
    }
  ) {
    // @ts-ignore
    state.user[object.attribute] = object.data;
  }
};
export default mutations;
