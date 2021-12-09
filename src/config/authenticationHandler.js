import React from 'react';
import { authorize, refresh } from 'react-native-app-auth';
import HomeScreen from '../screens/Home/homeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';
export class AuthenticationHandler {
  onLogin = () => {
    const array = {
      clientId: 'df352606d51c4ee5adae262823087892',
      clientSecret: 'd8332e8472ef481b93528ad1967cbbbf',
      redirectUrl: 'com.spotifytest:/callback',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
    try {
      
      authorize(array).then(res => {
        AsyncStorage.setItem(
          'myUser',
          JSON.stringify({
            isLoggedIn: true,
            accessToken: res.accessToken,
          }),
        );
        dispatch(
          setUser({
            isLoggedIn: true,
            accessToken: res.accessToken,
          }),
        );
       
      }, (error) => {
        console.log('==== Failure in OAuth2 initialization ====', error)
      })
      // result includes accessToken, accessTokenExpirationDate and refreshToken
    } catch (error) {
      alert("no")
      console.log(JSON.stringify(error));
      return false;
    }
  }
  refreshLogin = async () => {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}
export default AuthenticationHandler;