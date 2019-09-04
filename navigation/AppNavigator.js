import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import PostsScreen from '../screens/PostsScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';

const AppStack = createStackNavigator({ Test: PostsScreen, Home: MainTabNavigator});
const AuthStack = createStackNavigator({ SignIn: SignUpScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    //Main: MainTabNavigator,
  },
  {
    initialRouteName: 'App',
  }
  )
);
