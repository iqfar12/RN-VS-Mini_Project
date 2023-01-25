import { TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Text from '../../Component/Text'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userStorage } from '../../Service/Storage';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../Utils/Constant';
import NavigationService from '../../Service/Helper/NavigationService';
import { useSessionStore } from '../../Service/Store/SessionStore';

const LoginScreen = () => {
    const {navigate} = NavigationService;
    const {login} = useSessionStore();

    const onLogin = () => {
        login();
        // navigate(Screen.MAIN, {});
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