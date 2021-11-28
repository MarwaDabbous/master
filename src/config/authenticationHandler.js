import React from 'react';
import {authorize, refresh} from 'react-native-app-auth';
import HomeScreen from '../screens/Home/homeScreen';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthenticationHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  spotifyAuthConfig = {
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

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      const dispatch = useDispatch();
      AsyncStorage.setItem(
        'myUser',
        JSON.stringify({
          isLoggedIn: true,
          accessToken: result.accessToken,
        }),
      );
      dispatch(
        setUser({
          isLoggedIn: true,
          accessToken: result.accessToken,
        }),
      );
    } catch (error) {
      console.log(JSON.stringify(error));
      return false;
    }
  }

  async refreshLogin() {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}
