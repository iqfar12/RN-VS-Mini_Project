import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Text from './Text';
import Image from './Image';
import {widthPercentageToDP} from '../Utils/Helper/Sizing';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Article} from '../Screen/Home';
import moment from 'moment';

interface NewsCardProps {
  containerStyles?: StyleProp<ViewStyle>;
  data: Article;
  onMore?: () => void;
}

const NewsCard = ({containerStyles, data, onMore}: NewsCardProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <View style={styles.tag}>
            <Text weight="bold" size={12} color="#EA2518">
              {data?.source?.name}
            </Text>
          </View>
          <View style={styles.title}>
            <Text weight="bold" numberOfLines={3} size={14} color={'#000'}>
              {data?.title}
            </Text>
          </View>
        </View>
        <View style={styles.image}>
          <Image
            source={{
              uri: data?.urlToImage,
            }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text color="#6C757D">{moment(data?.publishedAt).fromNow()}</Text>
        <TouchableOpacity onPress={onMore} style={styles.more}>
          <Icon name="more-horiz" size={30} color={'#6C757D'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  tag: {
    marginBottom: 5,
  },
  titleContainer: {
    marginRight: 10,
    flex: 1,
  },
  image: {
    aspectRatio: 16 / 9,
    height: undefined,
    width: widthPercentageToDP(40),
    borderRadius: 10,
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    borderBottomWidth: 1,
    borderColor: '#ADB5BD',
    paddingVertical: 10,
  },
});
