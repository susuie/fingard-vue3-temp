import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ZRequestConfig, ZRequestInterceptors } from './type';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

const DEAFULT_LOADING = true;

class ZRequest {
  instance: AxiosInstance;
  interceptors?: ZRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: ZRequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    this.instance.interceptors.request.use(
      (config: ZRequestConfig) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }
        return config;
      },
      (err: any) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        this.loading?.close();
        return res;
      },
      (err: any) => {
        this.loading?.close();
        if (err.response && err.response.status === 404) {
          ElMessage.error('404~,该请求不存在～');
        } else {
          ElMessage.error(err);
        }
        return Promise.reject(err);
      }
    );
  }

  request<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEAFULT_LOADING; //重置showLoading,不影响下一次
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: ZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default ZRequest;
