import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screen/Home';
import {Screen} from '../Utils/Constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Screen/Home/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TrendingScreen from '../Screen/Trending';
import LoginScreen from '../Screen/Login';
import { userStorage } from '../Service/Storage';
import {register} from 'react-native-bundle-splitter';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  const isLogin = userStorage.getItem('isLogin');
  return (
    <Stack.Navigator initialRouteName={isLogin ? Screen.MAIN : Screen.LOGIN} screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Stack.Screen name={Screen.MAIN} component={TabNavigator} />
      <Stack.Screen name={Screen.LOGIN} component={register({loader: () => import('../Screen/Login')})} />
    </Stack.Navigator>
  );
};

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
        component={register({loader: () => import('../Screen/Home')})}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({color}) => (
            <Icon name="insights" size={25} color={color} />
          ),
        }}
        name={Screen.TRENDING}
        component={register({loader: () => import('../Screen/Trending')})}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Untukmu',
          tabBarIcon: ({color}) => <Icon name="star" size={25} color={color} />,
        }}
        name={Screen.EXCLUSIVE}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color}) => <Icon name="menu" size={25} color={color} />,
        }}
        name={Screen.MENU}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
