import { View } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from '../../Component/Header';
import NavigationService from '../../Service/Helper/NavigationService';
import Text from '../../Component/Text';
import { Article } from '../Home';
import moment from 'moment';
import Image from '../../Component/Image';

const DetailScreen = ({route}: any) => {
    const {data}: {data: Article} = route.params;
    const {pop} = NavigationService;
  return (
    <View style={styles.container}>
        <Header onBack={() => pop()} isBack title='Virtual.com' />
        <View style={styles.body}>
            <View style={styles.time}>
                <Text weight='bold' size={14} color={'#FF8859'} style={{marginRight: 5}}>{data.source.name}</Text>
                <Text color='#000'>{moment(data.publishedAt).format('LLLL')}</Text>
            </View>
            <View style={styles.title}>
                <Text weight='bold' size={18} color={'#000'}>{data.title}</Text>
            </View>
            <View style={styles.subTitle}>
                <Text size={16} color={'#ADB5BD'}>{data.description}</Text>
            </View>
            <View style={styles.image}>
                <Image resizeMode='contain' source={{uri: data.urlToImage}} />
            </View>
            <View style={styles.content}>
                <Text>{data.content}</Text>
            </View>
        </View>
    </View>
  )
}

export default DetailScreen