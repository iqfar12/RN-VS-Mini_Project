import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../Component/Header';
import BigNewsCard from '../../Component/BigNewsCard';
import Text from '../../Component/Text';
import NewsCard from '../../Component/NewsCard';
import { request } from '../../Api';
import moment from 'moment';

interface Source {
  id: string;
  name: string;
}

interface Article {
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
  const [data, setData] = useState<Article[]>([])

  const getData = async () => {
    const dateNow = moment(new Date()).format('YYYY-MM-DD');
    const url = `/everything?q=indonesia&language=id&from=${dateNow}&to=${dateNow}`;
    try {
      const res = await request.get(url);
      if (res) {
        setData(res.data.articles)
      }
    } catch (error) {
      console.log(error, 'error get data');
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.topHeadlines}>
            <View style={styles.topHeadlinesTitle}>
              <Text weight="bold" size={20} color={'#000'}>
                Editorial Top Series
              </Text>
            </View>
            <View style={styles.headlinesNews}>
              <BigNewsCard width={'100%'} />
            </View>

            <View style={styles.subHeadlines}>
              <BigNewsCard width={'45%'} />
              <BigNewsCard width={'45%'} />
            </View>

            <View style={styles.otherHeadlines}>
              <NewsCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
