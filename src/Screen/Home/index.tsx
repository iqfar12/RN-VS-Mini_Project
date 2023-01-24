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
  const [page, setPage] = useState(1);
  const articleStore = useArticleStore();

  useEffect(() => {
    articleStore.getToday({page: 1});
  }, [])

  const TopSeries: Article = useMemo(() => {
    return articleStore.today.data[0];
  }, [articleStore.today]);

  const SubTopSeries: Article[] = useMemo(() => {
    return articleStore.today.data.slice(2, 4);
  }, [articleStore.today]);

  const RestTopSeries: Article[] = useMemo(() => {
    return articleStore?.today?.data.slice(4, articleStore.today.data.length - 1);
  }, [articleStore.today]);

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
      />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            // getData(page + 1, search);
            articleStore.getToday({page: articleStore.today.page + 1})
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
              <BigNewsCard data={TopSeries} width={'100%'} />
            </View>

            <View style={styles.subHeadlines}>
              <BigNewsCard data={SubTopSeries[0]} width={'45%'} />
              <BigNewsCard data={SubTopSeries[1]} width={'45%'} />
            </View>

            <View style={styles.otherHeadlines}>
              {RestTopSeries.map((item, index) => (
                <NewsCard data={item} key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
