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

interface BigNewsCardProps {
  width: number | string;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const BigNewsCard = ({
  width,
  numberOfLines,
  containerStyle,
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
            uri: 'https://static.politico.com/18/00/4a54d0d44de28ae48b08590a0eb7/desantis-inauguration-32215.jpg',
          }}
        />
      </View>
      <View style={styles.category}>
        <Text weight="bold" size={12} color="#EA2518">
          Regional
        </Text>
      </View>
      <View style={styles.title}>
        <Text
          weight="bold"
          numberOfLines={numberOfLines ? numberOfLines : 2}
          size={16}
          color={'#000'}>
          Relief checks live updates: debt ceiling, social security payments,
          Davos World Economic Forum - AS USA
        </Text>
      </View>
      <View style={styles.bottom}>
        <Text color="#6C757D">1 jam lalu</Text>
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
