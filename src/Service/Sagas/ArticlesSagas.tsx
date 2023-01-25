import produce from 'immer';
import {call} from 'redux-saga/effects';
import { setState } from 'zustand-saga';
import LoadingHelper from '../Helper/LoadingHelper';

export function* getToday(api: any, params: any) {
    try {
    const response: unknown = yield call(api.getToday, params);

    yield setState(produce((state: any) => {
      state.today.fetching = false;
      state.today.data = params.params.page === 1 ? response.data.articles : [...state.today.data, ...response.data.articles];
      state.today.page = params.params.page
    }))
  } catch (error: any) {

    yield setState(produce(state => {
      state.today.fetching = false;
      state.today.error = true;
    }))
    console.log(error, 'error get today');
    return null;
  } finally {
    LoadingHelper.hide()
  }
}

export function* getTrending(api: any, params: any) {
    try {
      const response: unknown = yield call(api.getTrending, params);
  
      yield setState(produce(state => {
        state.trending.fetching = false;
        state.trending.data = state.trending.page === 1 ? response.data.articles : [...state.trending.data, ...response.data.articles];
        state.trending.page = params.data.page;
      }))
    } catch (error: any) {

        yield setState(produce(state => {
          state.trending.fetching = false;
        }))

        console.log(error, 'error');
      return null;
    } finally {
      LoadingHelper.hide()
    }
  }
  