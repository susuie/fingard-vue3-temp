export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

export interface IAccount {
  name: string;
  password: string;
}

export interface IPhone {
  mobile: string;
  code: string;
}
