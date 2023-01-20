import {call, select} from 'redux-saga/effects';
import { setState } from 'zustand-saga';

export function* getToday(api: any, params: any) {
    try {
    const response: unknown = yield call(api.getToday, params);
    const today: unknown = yield select((state: any) => state.today);

    yield setState({
        today: {
            ...today,
        fetching: false,
        data: response.data.articles,
        }
    })
  } catch (error: any) {

    yield setState({
        today: {
            fetching: false,
            data: [],
            error: false
        }
    })
    console.log(error, 'error get today');
    return null;
  }
}

export function* getTrending(api: any, params: any) {
    try {
      const response: unknown = yield call(api.getTrending, params);
      const trending: unknown = yield select((state: any) => state.trending);
  
      yield setState({
        trending: {
            ...trending,
            fetching: false,
            data: response.data.articles,
        }
      })
    } catch (error: any) {

        yield setState({
            trending: {
                fetching: false,
                data: [],
                error: false
            }
        })
      console.log(error, 'error');
      return null;
    }
  }
  