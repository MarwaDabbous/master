import React, {Component} from 'react';
import {NativeBaseProvider} from 'native-base';
import LoginScreen from './src/screens/Login/loginScreen';
import HomeScreen from './src/screens/Home/homeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import ArtistScreen from './src/screens/ArtistResult/ArtistScreen';
import AlbumsScreen from './src/screens/AlbumsResult/AlbumsScreen';

const Stack = createStackNavigator();

function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    dispatchStore();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatchStore();
      console.log('App has come to the foreground!');
    }
    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };
  const [res, setRes] = useState(false);

  const dispatchStore = async () => {
    const myUser = JSON.parse(await AsyncStorage.getItem('myUser'));
    if (myUser.isLoggedIn === true) {
      setRes(true);
    }
  };

  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {res ? (
              <Stack.Screen
                name="Home"
                options={{headerShown: false, title: 'HomeScreen'}}
                component={HomeScreen}
              />
            ) : (
              <Stack.Screen
                name="LoginScreen"
                options={{headerShown: false, title: 'Login'}}
                component={LoginScreen}
              />
            )}
            <Stack.Screen
              name="HomeScreen"
              options={{headerShown: false, title: 'HomeScreen'}}
              component={HomeScreen}
            />
            <Stack.Screen
              name="ArtistScreen"
              options={{title: 'Artists'}}
              component={ArtistScreen}
            />
            <Stack.Screen
              name="AlbumsScreen"
              options={{title: 'Albums'}}
              component={AlbumsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
export default App;
