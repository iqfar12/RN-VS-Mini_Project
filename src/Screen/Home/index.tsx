import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Header from '../../Component/Header';

const HomeScreen = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  return (
    <View style={styles.container}>
      <Header
        title="Virtual.com"
        onClickSearch={() => setIsSearch(true)}
        onCloseSearch={() => {
            setIsSearch(false)
            setSearch('')
        }}
        searchVal={search}
        onSearch={(val: string) => setSearch(val)}
        isSearch={isSearch}
      />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
