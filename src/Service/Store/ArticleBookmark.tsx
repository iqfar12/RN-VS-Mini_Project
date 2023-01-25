import produce from "immer"
import { create } from "zustand";
import sagaMiddleware from "zustand-saga";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import MMKVStoragePersistHelper from "../Helper/MMKVManager";
import root from "../Sagas";

const DEFAULT_BOOKMART_STATE = {
    data: [],
}

const setBookmark = (store: any, params: any) => {
    store.setState(produce((state: any) => {
        const {data} = state.bookmark;
        const isBookmarked = data.some((item: any) => JSON.stringify(item) === JSON.stringify(params));
        console.log(isBookmarked, 'isBookmarked');
        // const isAlreadyBookMark = state.bookmark.data.includes(params);
        // console.log(isAlreadyBookMark, 'bookmark')
        if (!isBookmarked) {
            state.bookmark.data = [...data, params]; 
        }
    }))
}

export const useBookmarkArticleStore = create(
    persist(
        sagaMiddleware(
            root,
            immer((get, set, store) => ({
                bookmark: DEFAULT_BOOKMART_STATE,
                setBookmark: (params: any) => setBookmark(store, params),
            }))
        ),
        {
            name: 'BookmarkArticles',
            version: 1,
            storage: createJSONStorage(() => new MMKVStoragePersistHelper('BookmarkArticle'))
        }
    )
)