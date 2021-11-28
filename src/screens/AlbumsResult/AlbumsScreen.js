import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {View, Linking} from 'react-native';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {customFunctions} from '../../config/customFunctions';

const AlbumsScreen = ({route}) => {
  const id = route.params;
  const [data, setData] = useState([]);
  const customService = new customFunctions();

  const search = () => {
    var service = customService.searchArtist();
    fetch('https://api.spotify.com/v1/artists/' + id + '/albums', service)
      .then(res => res.json())
      .then(response => {
        setData(response.items);
      });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.albumDetails}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              onPress={() =>
                Linking.openURL(item.artists[0].external_urls.spotify)
              }>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.images && item.images[0] && item.images[0].url,
                  }}
                />
                <Text numberOfLines={3} style={styles.albumName}>
                  {item.name}
                </Text>
                <Text style={styles.artistName}>{item.artists[0].name}</Text>
                <Text style={styles.artistName}>{item.release_date}</Text>
                <Text style={styles.artistName}>
                  {item.total_tracks} Track(s)
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

let width = Dimensions.get('screen').width / 2 - 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  albumDetails: {
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
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  albumName: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    minHeight: 70,
  },
  artistName: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    padding: 5,
  },
});
export default AlbumsScreen;
