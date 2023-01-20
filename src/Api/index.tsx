import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import moment from 'moment';

export const API_KEY: string = '135861d144c04b55bb74a4aa3cca593b';
export const BASE_URL: string = 'https://newsapi.org/v2';

const defaultHeader = () => {
  return {
    Authorization: API_KEY,
  };
};

// export const request = {
//   get: (prefix: string, header: AxiosHeaders | undefined = undefined) => {
//     return axios
//       .get(BASE_URL + prefix, {headers: header ? header : defaultHeader()})
//       .then(res => Promise.resolve(res))
//       .catch(error => Promise.reject(error.response.data || error));
//   },
// };

interface TodayParams {
  page: number;
  search: string;
}

interface TrendingParams {
  page: number;
}

const Api = () => {
  const request = axios.create({
    baseURL: BASE_URL,
    headers: defaultHeader(),
    timeout: 10000,
  });
  const dateNow = moment(new Date()).format('YYYY-MM-DD');

  const getToday = (params: TodayParams) => {
    const data = params.params;
    return request.get(
      `/everything?q=indonesia&language=id&from=${dateNow}&to=${dateNow}&page=${data.page}&pageSize=20&qInTitle=${data.search}`,
    );
  }


  const getTrending = (params: TrendingParams) => {
    return request.get(`/top-headlines?country=id&page=$${params.data.page}&pageSize=20`);
  }

  return {
    getToday,
    getTrending,
  };
};

export default Api;
