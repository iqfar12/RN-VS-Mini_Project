import {FlatList, NativeScrollEvent, ScrollView, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import Header from '../../Component/Header';
import BigNewsCard from '../../Component/BigNewsCard';
import Text from '../../Component/Text';
import NewsCard from '../../Component/NewsCard';
import {request} from '../../Api';
import moment from 'moment';
import {useArticleStore} from '../../Service/Store';
import {isCloseToBottom} from '../../Utils/Scroll Event Handler';
import LoadingModal from '../../Component/LoadingModal';
import BottomModal from '../../Component/BottomModal';
import NavigationService from '../../Service/Helper/NavigationService';
import { Screen } from '../../Utils/Constant';
import { userStorage } from '../../Service/Storage';
import { useSessionStore } from '../../Service/Store/SessionStore';
import { useTodayArticleStore } from '../../Service/Store/ArticleTodayStore';
import { useBookmarkArticleStore } from '../../Service/Store/ArticleBookmark';

export interface Source {
  id: string;
  name: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const HomeScreen = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [bottomMenu, setBottomMenu] = useState<boolean>(false);
  const [newsAction, setNewsAction] = useState<Article>();
  // const {data, page} = useArticleStore((state: any) => state.today);
  const {today, getToday} = useTodayArticleStore();
  const {data, page} = today;
  const {logout} = useSessionStore();
  const {setBookmark} = useBookmarkArticleStore();
  const {navigate} = NavigationService;

  useEffect(() => {
    getToday({page: 1});
  }, [])

  const TopSeries: Article = useMemo(() => {
    return data[0];
  }, [data]);

  const SubTopSeries: Article[] = useMemo(() => {
    return data.slice(2, 4);
  }, [data]);

  const RestTopSeries: Article[] = useMemo(() => {
    return data.slice(4, data.length - 1);
  }, [data]);

  const onMore = (data: Article) => {
    setNewsAction(data);
    setBottomMenu(true);
  }

  const onMoreClose = () => {
    setBottomMenu(false)
    setNewsAction(undefined);
  }

  const toDetail = (params: Article) => {
    navigate(Screen.DETAIL, {data: params});
  }

  return (
    <View style={styles.container}>
      <Header
        title="Virtual.com"
        onClickSearch={() => setIsSearch(true)}
        onCloseSearch={() => {
          setIsSearch(false);
          setSearch('');
        }}
        searchVal={search}
        onSearch={(val: string) => setSearch(val)}
        isSearch={isSearch}
        onClickAccount={() => {
          logout()
        }} 
      />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            // getData(page + 1, search);
            getToday({page: page + 1})
          }
        }}>
        <View style={styles.body}>
          <View style={styles.topHeadlines}>
            <View style={styles.topHeadlinesTitle}>
              <Text weight="bold" size={20} color={'#000'}>
                Editorial Top Series
              </Text>
            </View>
            <View style={styles.headlinesNews}>
              <BigNewsCard onPress={() => toDetail(TopSeries)} onMore={() => onMore(TopSeries)} data={TopSeries} width={'100%'} />
            </View>

            <View style={styles.subHeadlines}>
              <BigNewsCard onPress={() => toDetail(SubTopSeries[0])} onMore={() => onMore(SubTopSeries[0])} data={SubTopSeries[0]} width={'45%'} />
              <BigNewsCard onMore={() => onMore(SubTopSeries[1])} onPress={() => toDetail(SubTopSeries[1])} data={SubTopSeries[1]} width={'45%'} />
            </View>

            <View style={styles.otherHeadlines}>
              {RestTopSeries.map((item, index) => (
                <NewsCard onMore={() => onMore(item)} onPress={() => toDetail(item)} data={item} key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomModal visible={bottomMenu} onReadLater={() => setBookmark(newsAction)} onClose={onMoreClose} />
    </View>
  );
};

export default HomeScreen;
