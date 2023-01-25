import { register } from "react-native-bundle-splitter";
import { Screen } from "../Utils/Constant";

export const HomeScreenRegister = register({loader: () => import('../Screen/Home'), name: Screen.HOME, group: 'Tab'});
export const LoginScreen = register({loader: () => import('../Screen/Login'), name: Screen.LOGIN, group: 'Auth'});
export const TrendingScreen = register({loader: () => import('../Screen/Trending'), name: Screen.TRENDING, group: 'Tab' })
export const BookmarkScreen = register({loader: () => import('../Screen/Bookmark'), name: Screen.EXCLUSIVE, group: 'Tab'});
export const DetailScreen = register({loader: () => import('../Screen/Detail'), name: Screen.DETAIL, group: 'News'});