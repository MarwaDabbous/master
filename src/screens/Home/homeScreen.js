import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const [artistName, setArtistName] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(83,181,110)', 'white']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={styles.text}>Search & Discover</Text>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search for an artist... "
            underlineColorAndroid="transparent"
            defaultValue={artistName}
            onChangeText={text => {
              setArtistName(text);
            }}
          />
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="black"
            onPress={() => navigation.navigate('ArtistScreen', artistName)}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  textView: {
    marginTop: 200,
  },
  text: {
    marginTop: '50%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '95%',
    height: '8%',
    alignSelf: 'center',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
export default HomeScreen;
