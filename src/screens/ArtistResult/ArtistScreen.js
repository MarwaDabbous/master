import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customFunctions} from '../../config/customFunctions';

const ArtistScreen = ({navigation, route}) => {
  const artistName = route.params;
  const [data, setData] = useState([]);
  const width = Dimensions.get('screen').width / 2 - 8;
  const customService = new customFunctions();

  const artistsList = async () => {
    const myUser = JSON.parse(await AsyncStorage.getItem('myUser'));
    var service = customService.searchArtist(myUser.accessToken);
    console.log('Marwa', service);
    fetch(
      'https://api.spotify.com/v1/search?q=' +
        artistName +
        '&type=artist&market=es&limit=10&offset=5',
      service,
    )
      .then(res => res.json())
      .then(response => {
        setData(response.artists.items);

      });
  };

  useEffect(() => {
    artistsList();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.artistButton}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              onPress={() => navigation.navigate('AlbumsScreen', item.id)}>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.images && item.images[0] && item.images[0].url,
                  }}
                />
                <Text numberOfLines={1} style={styles.arstistName}>
                  {item.name}
                </Text>
                <Text style={styles.text}>
                  {item.followers.total} Followers
                </Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <MaterialIcons name="star-border" size={20} color="gray" />
                  <MaterialIcons name="star-border" size={20} color="gray" />
                  <MaterialIcons name="star-border" size={20} color="gray" />
                  <MaterialIcons name="star-border" size={20} color="gray" />
                  <MaterialIcons name="star-border" size={20} color="gray" />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

 const width = Dimensions.get('screen').width / 2 - 8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  artistButton: {
    flexShrink: 1,
    marginLeft: 10,
    marginRight: 10,
    width: width,
    height: '90%',
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'gray',
    borderRadius: 10,
  },
  arstistName: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    padding: 5,
  },
});
export default ArtistScreen;
