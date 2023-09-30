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

const OtpVerification = ({navigation}) => {
  const [otp, setOtp] = React.useState('');

  const verifyOTP = async (e) => {
    e.preventDefault()
    const value = await AsyncStorage.getItem('tempid');
    try {
      let url = "users/verify-otp";
      var payload = {
        id: value,
        otp: otp,
      };
      let response = await postMethod({ url, payload });
      console.log("verify otp res=",response)
      if(response.success){
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        navigation.navigate("/resetPassword")
        setOtp("");
      }else{
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log("api err",e);
      ToastAndroid.show(e.response.message, ToastAndroid.LONG);
      setOtp("");
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
              OTP Verification
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
                  label="OTP"
                  style={{backgroundColor:"white"}}
                  value={otp}
                  keyboardType="numeric"
                  mode="outlined"
                  onChangeText={text => setOtp(text)}
                  theme={{roundness: 20}}
                  right={<TextInput.Icon icon="email" />}
                />
              </VStack>
            </View>
            <TouchableOpacity style={AppStyles.authButton} onPress={verifyOTP}>
              <Text style={{fontFamily: 'Inter-Bold', color: 'white'}}>
                Verify OTP
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

export default OtpVerification;
