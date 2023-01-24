import { FlatList, View } from 'react-native'
import React from 'react'
import Text from '../../Component/Text'
import styles from './styles'
import Header from '../../Component/Header'
import { useArticleStore } from '../../Service/Store'
import NewsCard from '../../Component/NewsCard'

const BookmarkScreen = () => {
    const articleStore = useArticleStore();
  return (
    <View style={styles.container}>
        <Header title='Bookmark' />


        <View style={styles.body}>
        <FlatList
          data={articleStore.bookmark.data}
          renderItem={({item, index}) => <NewsCard data={item} />}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        />
      </View>
    </View>
  )
}

export default BookmarkScreen