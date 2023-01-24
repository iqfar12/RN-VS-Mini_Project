import {create, StoreApi, UseBoundStore} from 'zustand';
import {Article} from '../../Screen/Home';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import root from '../Sagas';
import MMKVStoragePersistHelper from '../Helper/MMKVManager';
import sagaMiddleware from 'zustand-saga';

interface ArticleStoreProps {
  today: Article[];
  trending: Article[];
  setToday: (data: Article[]) => void;
  setTrending: (data: Article[]) => void;
}

export enum ArticleTypes {
  GET_TODAY = 'GET_TODAY',
  GET_TRENDING = 'GET_TRENDING',
}

const DEFAULT_TODAY_STATE = {
  data: [],
  fetching: false,
  payload: undefined,
  error: false,
  page: 1,
};

const DEFAULT_TRENDING_STATE = {
  data: [],
  fetching: false,
  payload: undefined,
  error: false,
  page: 1,
};

// export const useArticleStore: UseBoundStore<StoreApi<ArticleStoreProps>> =
//   create(set => ({
//     today: [],
//     trending: [],
//     setToday: (data: Article[]) => set({today: data}),
//     setTrending: (data: Article[]) => set({trending: data}),
//   }));

const getToday = (store: any, params: any) => {
  const today = store.getState().today;

  store.setState({
    today: {
      ...today,
      fetching: true
    },
  });

  return store.putActionToSaga({type: ArticleTypes.GET_TODAY, params: params});
};

const getTrending = (store: any, params: any) => {
  const trending = store.getState().trending;
  
  store.setState({
    trending: {
      ...trending,
      fetching: true
    }
  })
  
  return store.putActionToSaga({type: ArticleTypes.GET_TRENDING, data: params});
}

export const useArticleStore = create(
  persist(
    sagaMiddleware(
      root,
      immer((get, set, store) => ({
        today: DEFAULT_TODAY_STATE,
        trending: DEFAULT_TRENDING_STATE,
        getToday: (params: any) => getToday(store, params),
        getTrending: (params: any) => getTrending(store, params)
      })),
    ),
    {
      name: 'Article',
      version: 1,
      storage: createJSONStorage(() => new MMKVStoragePersistHelper('Article')),
    },
  ),
);
