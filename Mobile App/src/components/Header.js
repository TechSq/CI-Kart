import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Header = ({navigation}) => {
  const User = useSelector(state => state.data);
  console.log('User=', User);
  return (
    <View style={styles.container}>
    <TouchableOpacity
      onPress={() => {
        if (User == null) {
          navigation.navigate('/login');
        } else {
          navigation.navigate('/cart');
        }
      }}>
      <Image
        source={require('../assets/cart.png')}
        style={{ resizeMode: 'contain',marginRight:10}}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        if (User == null) {
          navigation.navigate('/login');
        } else {
          navigation.navigate('/wishlist');
        }
      }}>
       <Image
        source={require('../assets/heartIcon.png')}
        style={{ resizeMode: 'contain'}}
      />
    </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginRight: '20%',
    flexDirection:"row"
  },
});
