import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../Utils/Constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Screen/Home/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { userStorage } from '../Service/Storage';
import {preload, register} from 'react-native-bundle-splitter';
import { Fragment, useEffect } from 'react';
import LoadingModal from '../Component/LoadingModal';
import { BookmarkScreen, DetailScreen, HomeScreenRegister, LoginScreen, TrendingScreen } from './Register';
import NavigationService from '../Service/Helper/NavigationService';
import { useSessionStore } from '../Service/Store/SessionStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Stack.Screen name={Screen.MAIN} component={TabNavigator} />
      <Stack.Screen name={Screen.DETAIL} component={DetailScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  )
}

const TabNavigator = () => { 

  return (
    <Tab.Navigator screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Hari ini',
          tabBarIcon: ({color}) => (
            <Icon name="article" size={25} color={color} />
          ),
        }}
        name={Screen.HOME}
        component={HomeScreenRegister}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({color}) => (
            <Icon name="insights" size={25} color={color} />
          ),
        }}
        name={Screen.TRENDING}
        component={TrendingScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Untukmu',
          tabBarIcon: ({color}) => <Icon name="star" size={25} color={color} />,
        }}
        name={Screen.EXCLUSIVE}
        component={BookmarkScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color}) => <Icon name="menu" size={25} color={color} />,
        }}
        name={Screen.MENU}
        component={HomeScreenRegister}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const isLogin = useSessionStore((state: any) => state.isLogin);
  useEffect(() => {

    // Preload Every Screen;
    preload().group('Tab')
    // preload().component(Screen.LOGIN).finally(() => {
      
    // })
  }, [])
  return (
    <Fragment>
      <NavigationContainer ref={(ref) => NavigationService.setInstance(ref)}>
        {isLogin ? <StackNavigator /> : <AuthStack />}
      </NavigationContainer>
      <LoadingModal />
    </Fragment>
  );
};

export default MainNavigator;
