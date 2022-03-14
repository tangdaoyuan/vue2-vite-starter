/*
 * @Author: tangdaoyuan
 * @Date: 2021-06-02 17:23:46
 * @LastEditTime: 2021-06-19 11:21:28
 * @LastEditors: tangdaoyuan@megvii.com
 */
/**
 * Axios Instance
 */
import { uuid } from '@/utils/uuid';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 生成uuid 附着在请求头中
  if (config.headers) {
    config.headers['Request-ID'] = uuid();
  }
  return config;
});

// 后续处理http status 200, code === 401 跳转的情况
const respOnFulfilled = function (resp: AxiosResponse) {
  return resp;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const respOnReject = function (error: any) {
  const { response } = error;
  if (response?.status === 401) {
    // Cookies.remove('jes');
    const { location } = response.headers;
    window.location.href = `${location}`;
  }
  Promise.reject(error);
};

axiosInstance.interceptors.response.use(respOnFulfilled, respOnReject);

export default axiosInstance;
