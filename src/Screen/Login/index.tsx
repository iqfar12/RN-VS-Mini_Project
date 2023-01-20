import { TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Text from '../../Component/Text'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userStorage } from '../../Service/Storage';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../Utils/Constant';

const LoginScreen = () => {
    const navigation = useNavigation();

    const onLogin = () => {
        userStorage.setItem('isLogin', JSON.stringify(true));
        navigation.navigate(Screen.MAIN)
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogin} style={styles.button}>
        <Text weight='bold' size={16} color={'#000'}>Login as Quest</Text>
        <Icon name='account-circle' size={25} color={'#000'} />
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen