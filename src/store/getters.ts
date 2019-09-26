import { StateInterface } from '@/store/state.interface';

export const isAuthenticated = (state: StateInterface) => state.isAuthenticated;
export const user = (state: StateInterface) => state.user;
