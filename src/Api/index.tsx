import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';

export const API_KEY: string = '135861d144c04b55bb74a4aa3cca593b';
export const BASE_URL: string = 'https://newsapi.org/v2';

const defaultHeader = () => {
  return {
    Authorization: API_KEY,
  };
};

export const request = {
  get: (prefix: string, header: AxiosHeaders | undefined = undefined) => {
    return axios
      .get(BASE_URL + prefix, {headers: header ? header : defaultHeader()})
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error.response.data || error));
  },
};
