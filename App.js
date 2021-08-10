import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import IntroScreen from "./Screens/IntroScreen";
import ChatScreen from "./Screens/ChatScreen";
import SettingsScreen from "./Screens/SettingsScreen";

import { PersistGate } from 'redux-persist/integration/react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['chat'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [ReduxThunk, createLogger()];

export default class App extends React.Component {
  render() {
    const store = createStore(persistedReducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: IntroScreen,
    Chat: ChatScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);
