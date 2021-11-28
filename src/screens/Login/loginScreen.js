import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import {AuthenticationHandler} from '../../config/authenticationHandler';

const LoginScreen = ({navigation}) => {
  const authenticationHandler = new AuthenticationHandler();
  const login = () => {
    authenticationHandler.onLogin();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(83,181,110)', 'white']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
        />
        <Button style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>L O G I N</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Search</Text>
        </Button>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },

  button: {
    margin: 1,
    width: '80%',
    height: '7%',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 18,
  },
  image: {
    width: '40%',
    height: '20%',
    alignSelf: 'center',
    marginTop: '60%',
  },
});
export default LoginScreen;
