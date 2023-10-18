import Axios from 'axios';

Axios.interceptors.request.use(async config => {
  if (!!global.token) {
    config.headers = {
      Authorization: `Bearer ${global.token}`,
      ...config.headers,
    };
  }
  config.headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  config.timeout = 30000;

  return config;
});

export const getRequestApi = (url, headers = {}, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.get(url, {headers, params});
      resolve({
        errorStatus: false,
        statusCode: response.status,
        data: response.data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const postRequestApi = (url, data, headers = {}, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post(url, data, {headers, params});
      resolve({
        errorStatus: false,
        statusCode: response.status,
        data: response.data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// delete request
export const deleteRequestApi = (url, headers = {}, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.delete(url, {headers, params});
      resolve({
        errorStatus: false,
        statusCode: response.status,
        data: response.data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
