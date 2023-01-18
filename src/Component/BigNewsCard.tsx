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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Article} from '../Screen/Home';
import moment from 'moment';

interface BigNewsCardProps {
  width: number | string;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  data: Article;
}

const BigNewsCard = ({
  width,
  numberOfLines = 2,
  containerStyle,
  data,
}: BigNewsCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {width: width ? width : '100%'},
        containerStyle,
      ]}>
      <View style={styles.image}>
        <Image
          source={{
            uri: data?.urlToImage,
          }}
        />
      </View>
      <View style={styles.category}>
        <Text weight="bold" size={12} color="#EA2518">
          {data?.source?.name}
        </Text>
      </View>
      <View style={styles.title}>
        <Text
          weight="bold"
          numberOfLines={numberOfLines}
          size={16}
          color={'#000'}>
          {data?.title}
        </Text>
      </View>
      <View style={styles.bottom}>
        <Text color="#6C757D">{moment(data?.publishedAt).fromNow()}</Text>
        <TouchableOpacity style={styles.more}>
          <Icon name="more-horiz" size={30} color={'#6C757D'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BigNewsCard;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 16 / 9,
    height: undefined,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  category: {
    paddingBottom: 5,
    paddingTop: 10,
  },
  title: {
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingBottom: 10,
  },
});
