import React, {Component, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import Login from '../screens/AuthModule/Login';
import Intro from '../screens/AuthModule/Intro';
import Register from '../screens/AuthModule/Register';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import ForgotPassword from '../screens/AuthModule/ForgotPassword';
import OtpVerification from '../screens/AuthModule/OtpVerification';
import ResetPassword from '../screens/AuthModule/ResetPassword';
import Category from '../screens/Category/Category';
import {Text} from 'react-native-paper';
import SubCategory from '../screens/SubCategory/SubCategory';
import Product from '../screens/Product/Product';
import ProductDetails from '../screens/Product/ProductDetails';
import Cart from '../screens/Cart/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wishlist from '../screens/Cart/Wishlist';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      initialRouteName="/intro">
      {/* {UserToken == undefined || null ? (
        <> */}
      <Stack.Screen name="/intro" component={Intro} />
      <Stack.Screen name="/login" component={Login} />
      <Stack.Screen name="/register" component={Register} />
      <Stack.Screen name="/forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="/verifyOtp" component={OtpVerification} />
      <Stack.Screen name="/resetPassword" component={ResetPassword} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Categories
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/category"
        component={Category}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Sub Categories
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/subcategory"
        component={SubCategory}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Product
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/products"
        component={Product}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Product Details
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/productDetails"
        component={ProductDetails}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Cart
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/cart"
        component={Cart}
      />
       <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
              }}>
              Wishlist
            </Text>
          ),
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
        }}
        name="/wishlist"
        component={Wishlist}
      />
      {/* </>
      ) : (
        <>
          <Stack.Screen name="/login" component={Login} />
          <Stack.Screen name="/intro" component={Intro} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </>
      )} */}
    </Stack.Navigator>
  );
};

export default StackNavigation;
