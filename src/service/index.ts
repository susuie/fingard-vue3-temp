import ZRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';

import localCache from '@/utils/cache';

const zRequest = new ZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      config.headers = config.headers ?? {};
      const token = localCache.getCache('token');
      config.headers.Authorization = token;
      //const label = 'eureka-label';
      const type = 'Content-Type';
      //config.headers[label] = 'Makayla'; //'linccc';
      config.headers[type] = 'application/x-www-form-urlencoded';
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      const data = res.data;
      if (data.code !== '0') {
        if (data.code === '4') {
          data.isDelete = true;
          return data;
        }
        if (data.code && data.info.includes('素材已存在')) {
          return data.data;
        }
        return Promise.reject(`请求失败~, 错误信息：${data.info}`);
      } else {
        return data;
      }
    },
    responseInterceptorCatch: (err) => {
      if (/^3\d{2}$/.test(err.response?.status)) {
        return err.response.data;
      }
      return Promise.reject('网络不太好，请检查网络');
    }
  }
});

export default zRequest;
