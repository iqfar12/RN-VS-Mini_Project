import {FlatList, NativeScrollEvent, ScrollView, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import Header from '../../Component/Header';
import BigNewsCard from '../../Component/BigNewsCard';
import Text from '../../Component/Text';
import NewsCard from '../../Component/NewsCard';
import { request } from '../../Api';
import moment from 'moment';
import { useArticleStore } from '../../Service/Store';

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

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const getData = async (pageNow: number, searchVal: string = 'indonesia') => {
    if (page === pageNow && page !== 1) {
      return;
    }
    const dateNow = moment(new Date()).format('YYYY-MM-DD');
    const url = `/everything?q=indonesia&language=id&from=${dateNow}&to=${dateNow}&page=${pageNow}&pageSize=20&qInTitle=${searchVal}`;
    try {
      const res = await request.get(url);
      if (res) {
        if (pageNow === 1) {
          articleStore.setToday(res.data.articles);
        } else {
          articleStore.setToday([...articleStore.today, ...res.data.articles])
        }
        if (res.data.articles.length > 0) {
          setPage(pageNow)
        }
      }
    } catch (error) {
      console.log(error, 'error get data');
    }
  }

  useEffect(() => {
    getData(page);
  }, []);

  const TopSeries: Article = useMemo(() => {
    return articleStore.today[0];
  }, [articleStore.today]);

  const SubTopSeries: Article[] = useMemo(() => {
    return articleStore.today.slice(2, 4);
  }, [articleStore.today])

  const RestTopSeries: Article[] = useMemo(() => {
    return articleStore?.today?.slice(4, articleStore.today.length - 1);
  }, [articleStore.today])

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
      <ScrollView onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          getData(page + 1, search)
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
              {RestTopSeries.map((item, index) => <NewsCard data={item} key={index} />)}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
