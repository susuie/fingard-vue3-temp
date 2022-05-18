import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ZRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface ZRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZRequestInterceptors<T>;
  showLoading?: boolean;
}
