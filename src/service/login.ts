// service统一出口
import ZRequest from './request';
import { TIME_OUT } from './request/config';

const loginRequest = new ZRequest({
  baseURL: '/api/AUTHCORE/',
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      config.headers = config.headers ?? {};
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

export default loginRequest;
