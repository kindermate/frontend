import store from '@/store';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (store.state.accessToken) {
        config.headers.Authorization = 'Bearer ' + store.state.accessToken;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      return Promise.reject(error);
    },
  );

  return instance;
}
