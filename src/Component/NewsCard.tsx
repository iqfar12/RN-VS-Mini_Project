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

interface NewsCardProps {
  containerStyles?: StyleProp<ViewStyle>;
}

const NewsCard = ({containerStyles}: NewsCardProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <View style={styles.tag}>
            <Text weight="bold" size={12} color="#EA2518">
              Regional
            </Text>
          </View>
          <View style={styles.title}>
            <Text weight="bold" numberOfLines={3} size={14} color={'#000'}>
              Relief checks live updates: debt ceiling, social security
              payments, Davos World Economic Forum - AS USA
            </Text>
          </View>
        </View>
        <View style={styles.image}>
          <Image
            source={{
              uri: 'https://static.politico.com/18/00/4a54d0d44de28ae48b08590a0eb7/desantis-inauguration-32215.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text color="#6C757D">1 jam lalu</Text>
        <TouchableOpacity style={styles.more}>
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
