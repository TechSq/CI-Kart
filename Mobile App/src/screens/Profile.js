//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { signout } from '../redux/AuthAction';

// create a component
const Profile = ({navigation}) => {
    const dispatch  = useDispatch()
    const logout = async () => {
        try {
          dispatch(signout());
          await AsyncStorage.removeItem('@token')
          navigation.navigate("/login")
        } catch (e) {
          console.log(e);
        }
      };
    return (
        <View style={styles.container}>
            <Text style={{color:"black"}}>Profile</Text>
            <Button onPress={logout} title="Logout"/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Profile;
