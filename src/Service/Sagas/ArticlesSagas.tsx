import {call, select} from 'redux-saga/effects';
import { setState } from 'zustand-saga';

export function* getToday(api: any, params: any) {
  const today: unknown = yield select((state: any) => state.today);
    try {
    const response: unknown = yield call(api.getToday, params);

    yield setState({
        today: {
            ...today,
        fetching: false,
        data: params.params.page === 1 ? response.data.articles : [...today.data, ...response.data.articles],
        page: params.params.page,
        }
    })
    console.log('hit');
  } catch (error: any) {
    yield setState({
        today: {
            ...today,
            fetching: false,
            data: params.params.page > 1 ? today.data : [],
            error: false
        }
    })
    console.log(error, 'error get today');
    return null;
  }
}

export function* getTrending(api: any, params: any) {
  const trending: unknown = yield select((state: any) => state.trending);
    try {
      const response: unknown = yield call(api.getTrending, params);
  
      yield setState({
        trending: {
            ...trending,
            fetching: false,
            data: trending.page === 1 ? response.data.articles : [...trending.data, ...response.data.articles],
            page: params.data.page,
        }
      })
    } catch (error: any) {

        yield setState({
            trending: {
              ...trending,
                fetching: false,
                data: params.params.page > 1 ? trending.data : [],
                error: false
            }
        })
      console.log(error, 'error');
      return null;
    }
  }
  