import * as types from './mutation-types';

// 管理异步
const actions = {
  setAuthenticated: ({ commit }: any, isAuthenticated: any) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }: any, user: any) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState: ({ commit }: any) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
  }
};

export default actions;
