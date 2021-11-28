export class customFunctions {
  async searchArtist() {
    myUser = JSON.parse(await AsyncStorage.getItem('myUser'));
    var data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer' + this.myUser.accessToken,
      },
    };
    return data;
  }
}
