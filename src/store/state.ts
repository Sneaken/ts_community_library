import { StateInterface } from '@/store/state.interface';

const state: StateInterface = {
  isAuthenticated: false,
  user: {
    username: '',
    phone: '',
    email: '',
    component: '',
    exp: 0,
    iat: 0
  }
};

export default state;
