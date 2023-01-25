import produce from "immer";
import { create, StoreApi, UseBoundStore } from "zustand";
import sagaMiddleware from "zustand-saga";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ArticleTypes } from ".";
import { Article } from "../../Screen/Home";
import LoadingHelper from "../Helper/LoadingHelper";
import MMKVStoragePersistHelper from "../Helper/MMKVManager";
import root from "../Sagas";

const DEFAULT_TODAY_STATE = {
    data: [],
    fetching: false,
    payload: undefined,
    error: false,
    page: 1,
};

interface TodayStateProps {
    data: Article[];
    fetching: boolean;
    payload: any;
    error: false,
    page: number
}

interface TodayStoreProps {
    today: TodayStateProps;
    getToday: (params: any) => void;
}

const getToday = (store: StoreApi<unknown>, params: any) => {
    store.setState(produce((state: TodayStoreProps) => {
        state.today.fetching = true;
    }))

    LoadingHelper.show();

    return store.putActionToSaga({type: ArticleTypes.GET_TODAY, params: params})
}

export const useTodayArticleStore = create(
    persist(
        sagaMiddleware(
            root,
            immer((get, set, store) => ({
                today: DEFAULT_TODAY_STATE,
                getToday: (params: any) => getToday(store, params),
            }))
        ),
        {
            name: 'TodayArticle',
            version: 1,
            storage: createJSONStorage(() => new MMKVStoragePersistHelper('TodayArticle'))
        }
    )
)