import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import {Text, VStack} from '@react-native-material/core';
import AppStyles from '../../styles/Styles';
import {TextInput} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { postMethod } from '../../helpers';

const ResetPassword = ({navigation}) => {
const [password, setpassword] = useState('');
const [cpassword, setcpassword] = useState('');
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  const [rightIcon1, setRightIcon1] = useState('eye');
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [rightIcon2, setRightIcon2] = useState('eye');

  const handlePasswordVisibility1 = () => {
    if (rightIcon1 === 'eye') {
      setRightIcon1('eye-off');
      setPasswordVisibility1(!passwordVisibility1);
    } else if (rightIcon1 === 'eye-off') {
      setRightIcon1('eye');
      setPasswordVisibility1(!passwordVisibility1);
    }
  };
  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === 'eye') {
      setRightIcon2('eye-off');
      setPasswordVisibility2(!passwordVisibility2);
    } else if (rightIcon2 === 'eye-off') {
      setRightIcon2('eye');
      setPasswordVisibility2(!passwordVisibility2);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault()
    const value = await AsyncStorage.getItem('tempid');
    if(password === cpassword){
      try {
        let url = "users/reset-password";
        var payload = {
          id: value,
          password: password,
        };
        let response = await postMethod({ url, payload });
        console.log("verify otp res=",response.data)
        if(response.success){
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
          navigation.navigate("/login")
          setpassword("");
          setcpassword("");
        }else{
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      } catch (e) {
        console.log("api err",e);
        ToastAndroid.show(e.response.message, ToastAndroid.LONG);
        setpassword("");
        setcpassword("");
      }
    }else{
      ToastAndroid.show("Both should be same", ToastAndroid.LONG);
    }

  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
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
          <View >
            <Text
              style={{
                ...AppStyles.text,
                fontWeight: 700,
                textAlign: 'center',
                fontSize: 30,
                color: 'black',
                marginBottom: 5,
              }}>
              Set New Password
            </Text>
            <Text
              style={{
                ...AppStyles.text,
                fontWeight: 700,
                textAlign: 'center',
                fontSize: 13,
                color: '#005FAC',
              }}>
              Reset your password
            </Text>
            <View style={{marginVertical: '7%'}}>
              <VStack spacing={'4%'}>
              <TextInput
                  label="Password"
                  value={password}
                  style={{backgroundColor:"white"}}
                  mode="outlined"
                  onChangeText={text => setpassword(text)}
                  theme={{roundness: 20}}
                  right={
                    <TextInput.Icon
                      onPress={handlePasswordVisibility1}
                      icon={rightIcon1}
                    />
                  }
                />
                <TextInput
                  label="Confirm Password"
                  value={cpassword}
                  style={{backgroundColor:"white"}}
                  mode="outlined"
                  onChangeText={text => setcpassword(text)}
                  theme={{roundness: 20}}
                  right={
                    <TextInput.Icon
                      onPress={handlePasswordVisibility2}
                      icon={rightIcon2}
                    />
                  }
                />
              </VStack>
            </View>
            <TouchableOpacity style={AppStyles.authButton} onPress={savePassword}>
              <Text style={{fontFamily: 'Inter-Bold', color: 'white'}}>
                Save Password
              </Text>
            </TouchableOpacity>
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

export default ResetPassword;
