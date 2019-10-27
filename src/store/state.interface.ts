export interface StateInterface {
  isAuthenticated: boolean;
  user: UserInterface;
}

export interface UserInterface {
  username: string;
  component: string;
  phone: string;
  email: string;
  exp: number; // 秒数   到期时间
  iat: number; // 秒数   失效时间
}
