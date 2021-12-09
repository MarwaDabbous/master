import AsyncStorage from '@react-native-async-storage/async-storage';

export class customFunctions {
  searchArtist(user) {
    
    var data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + user,
      },
    };
    return data;
  }
}
