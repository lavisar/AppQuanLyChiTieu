/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ResetPassScreen from './ResetPassScreen';
import HomeScreen from './HomeScreen';

AppRegistry.registerComponent(appName, () => App);
