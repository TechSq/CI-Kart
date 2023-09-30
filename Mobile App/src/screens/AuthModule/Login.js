import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  Alert
} from 'react-native';
import {Text, VStack} from '@react-native-material/core';
import AppStyles from '../../styles/Styles';
import {TextInput} from 'react-native-paper';
import {Divider} from '@react-native-material/core';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {signin} from '../../redux/AuthAction';
import {postMethod, webClientId} from '../../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async e => {
    e.preventDefault();
    try {
      let url = 'users/login';
      var payload = {
        emailOrPhoneNumber: email,
        password: password,
        userType: 'User',
      };
      let response = await postMethod({url, payload});
      console.log('login res=', response);
      if (response.success) {
        dispatch(signin(response.data));
        await AsyncStorage.setItem('@token', response.data.token);
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        navigation.navigate('TabNavigation');
        setEmail('');
        setPassword('');
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log('api err', e);
      ToastAndroid.show(e.response.message, ToastAndroid.LONG);
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: "208119880030-knkjrcvo5mbrjn2m24uaegs3jkgk48ov.apps.googleusercontent.com",
    });
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      Alert.alert('User is already signed in');
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        Alert.alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available or Outdated');
      } else {
        Alert.alert("actual err=",error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <View>
          <ImageBackground
            source={require('../../assets/loginHalfBg.png')}
            resizeMode="cover"
            style={styles.imgBg}>
            <View style={{...AppStyles.center, justifyContent: 'center'}}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.img}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <VStack spacing={'3%'}>
            <View>
              <Text
                style={{
                  ...AppStyles.text,
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'black',
                  marginBottom: 5,
                }}>
                Welcome Back
              </Text>
              <Text
                style={{
                  ...AppStyles.text,
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#005FAC',
                }}>
                Login to your account
              </Text>
              <View style={{marginVertical: '7%'}}>
                <VStack spacing={'4%'}>
                  <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                    theme={{roundness: 20}}
                    right={<TextInput.Icon icon="email" />}
                    style={{backgroundColor: 'white'}}
                  />
                  <TextInput
                    label="Password"
                    value={password}
                    secureTextEntry={passwordVisibility}
                    mode="outlined"
                    onChangeText={text => setPassword(text)}
                    theme={{roundness: 20}}
                    right={
                      <TextInput.Icon
                        onPress={handlePasswordVisibility}
                        icon={rightIcon}
                      />
                    }
                    style={{backgroundColor: 'white'}}
                  />
                </VStack>
                <Text
                  onPress={() => navigation.navigate('/forgotPassword')}
                  style={{
                    ...AppStyles.text,
                    fontWeight: 700,
                    textAlign: 'right',
                    fontSize: 13,
                    color: '#005FAC',
                    marginTop: 10,
                  }}>
                  Forgot Password?
                </Text>
              </View>
              <TouchableOpacity style={AppStyles.authButton} onPress={onLogin}>
                <Text style={{fontFamily: 'Inter-Bold', color: 'white'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                {
                  //   ...AppStyles.center,
                  //   height: '35%',
                  //   justifyContent: 'center',
                  //   alignItems:"flex-start",
                  //   backgroundColor: 'red',
                }
              }>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Divider
                  style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 1,
                    width: 80,
                    marginHorizontal: 20,
                  }}
                />
                <Text
                  style={{
                    ...AppStyles.text,
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#000000',
                  }}>
                  or Login with
                </Text>
                <Divider
                  style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 1,
                    width: 80,
                    marginHorizontal: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginVertical: 10,
                }}>
                <View style={styles.card}>
                  <Image
                    source={require('../../assets/fbIcon.png')}
                    style={styles.img}
                  />
                  <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
                    Facebook
                  </Text>
                </View>
                <View style={styles.card}>
                  <GoogleSigninButton
                    style={{width: 180, height: 55}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={_signIn}
                  />
                </View>
              </View>
              <View style={{marginTop: '5%'}}>
                <Text variant="h6" style={{textAlign: 'center', color: 'gray'}}>
                  Don't have account ?{' '}
                  <Text
                    onPress={() => navigation.navigate('/register')}
                    variant="h6"
                    style={{textAlign: 'center', color: '#005FAC'}}>
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </VStack>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  body: {
    paddingVertical: '5%',
    paddingHorizontal: '6%',
    height: '100%',
    overflow: 'hidden',
    // backgroundColor:"red"
  },
  imgBg: {
    height: 180,
    width: '100%',
    justifyContent: 'center',
  },
  img: {
    width: '30%',
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    height: 50,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
