import {takeEvery} from 'redux-saga/effects';
import Api from '../../Api';
import {ArticleTypes} from '../Store';
import {getToday, getTrending} from './ArticlesSagas';

export default function* root() {
  yield takeEvery(ArticleTypes.GET_TODAY, getToday, Api());
  yield takeEvery(ArticleTypes.GET_TRENDING, getTrending, Api());
}
