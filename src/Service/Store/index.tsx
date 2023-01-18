import {create, StoreApi, UseBoundStore} from 'zustand';
import {Article} from '../../Screen/Home';

interface ArticleStoreProps {
  today: Article[];
  trending: Article[];
  setToday: (data: Article[]) => void;
  setTrending: (data: Article[]) => void;
}

export const useArticleStore: UseBoundStore<StoreApi<ArticleStoreProps>> =
  create(set => ({
    today: [],
    trending: [],
    setToday: (data: Article[]) => set({today: data}),
    setTrending: (data: Article[]) => set({trending: data}),
  }));
