import zRequest from '../index';
import loginRequest from '../login';

import { IAccount, IPhone } from './type';
import { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/tokenApi/getAccessToken',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount | IPhone) {
  return loginRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    params: account
  });
}

export function requestUserInfoById(id: number) {
  return zRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return zRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  });
}
