import {FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../Component/Text';
import styles from './styles';
import Header from '../../Component/Header';
import {useArticleStore} from '../../Service/Store';
import NewsCard from '../../Component/NewsCard';
import LoadingModal from '../../Component/LoadingModal';
import { useTrendingArticleStore } from '../../Service/Store/ArticleTrendingStore';

const TrendingScreen = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const {trending, getTrending} = useTrendingArticleStore();
  const {data, page} = trending;

  useEffect(() => {
    getTrending({page: 1})
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
          data={data}
          renderItem={({item, index}) => <NewsCard data={item} />}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          onEndReached={() => {
            // getData(page + 1, search);
            getTrending({page: page + 1})
          }}
        />
      </View>
    </View>
  );
};

export default TrendingScreen;
