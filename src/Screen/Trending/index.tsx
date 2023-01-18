import {FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../Component/Text';
import styles from './styles';
import Header from '../../Component/Header';
import {useArticleStore} from '../../Service/Store';
import NewsCard from '../../Component/NewsCard';
import {request} from '../../Api';

const TrendingScreen = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const articleStore = useArticleStore();

  const getData = async (pageNow: number, searchVal: string) => {
    const url = `/top-headlines?country=id&page=${pageNow}&pageSize=20`;
    try {
      const res = await request.get(url);
      if (res) {
        if (pageNow === 1) {
          articleStore.setTrending(res.data.articles);
        } else {
          articleStore.setTrending([
            ...articleStore.trending,
            ...res.data.articles,
          ]);
        }
        if (res.data.articles.length > 0) {
            setPage(pageNow);
        }
      }
    } catch (error) {
      console.log(error, 'error get trending');
    }
  };

  useEffect(() => {
    getData(1, search);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Trending"
        onClickSearch={() => setIsSearch(true)}
        onCloseSearch={() => {
          setIsSearch(false);
          setSearch('');
        }}
        searchVal={search}
        onSearch={(val: string) => setSearch(val)}
        isSearch={isSearch}
      />

      <View style={styles.body}>
        <FlatList
          data={articleStore.trending}
          renderItem={({item, index}) => <NewsCard data={item} />}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          onEndReached={() => {
            getData(page + 1, search)
          }}
        />
      </View>
    </View>
  );
};

export default TrendingScreen;
