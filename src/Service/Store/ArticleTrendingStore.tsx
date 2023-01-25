import produce from "immer"
import { create, StoreApi } from "zustand";
import sagaMiddleware from "zustand-saga";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ArticleTypes } from ".";
import { Article } from "../../Screen/Home";
import LoadingHelper from "../Helper/LoadingHelper";
import MMKVStoragePersistHelper from "../Helper/MMKVManager";
import root from "../Sagas";

interface TrendingStateProps {
    data: Article[];
    fetching: boolean;
    payload: any;
    error: boolean;
    page: number;
}

interface TrendingStoreProps {
    trending: TrendingStateProps;
    getTrending: (params: any) => void;
}

const DEFAULT_TRENDING_STATE = {
    data: [],
    fetching: false,
    payload: undefined,
    error: false,
    page: 1,
  };

const getTrending = (store: StoreApi<unknown>, params: any) => {
    store.setState(produce((state: TrendingStoreProps) => {
        state.trending.fetching = true;
    }))

    LoadingHelper.show();

    store.putActionToSaga({type: ArticleTypes.GET_TRENDING, data: params});
}

export const useTrendingArticleStore = create(
    persist(
        sagaMiddleware(
            root,
            immer((get, set, store) => ({
                trending: DEFAULT_TRENDING_STATE,
                getTrending: (params: any) => getTrending(store, params),
            }))
        ),
        {
            name: 'ArticleTrending',
            version: 1,
            storage: createJSONStorage(() => new MMKVStoragePersistHelper('ArticleTrending'))
        }
    )
)