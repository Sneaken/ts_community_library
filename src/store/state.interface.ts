export interface StateInterface {
  isAuthenticated: boolean;
  user: UserInterface;
}

export interface UserInterface {
  username: string;
  component: string;
  exp: number; // 秒数   到期时间
  iat: number; // 秒数   失效时间
}
