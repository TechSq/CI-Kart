import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home/Home';
import Category from '../screens/Category/Category';
import Likes from '../screens/Likes';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Header from '../components/Header';
const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarIcon: ({focused, color, size}) => {
        //   let iconName;

        //   if (route.name === 'Home') {
        //     iconName = focused ? 'home' : 'home-outline';
        //   } else if (route.name === 'Category') {
        //     iconName = focused ? 'notifications' : 'notifications-outline';
        //   } else if (route.name === 'Likes') {
        //     iconName = focused ? 'notifications' : 'notifications-outline';
        //   } else if (route.name === 'Notifications') {
        //     iconName = focused ? 'notifications' : 'notifications-outline';
        //   } else if (route.name === 'Profile') {
        //     iconName = focused ? 'person' : 'person-outline';
        //   }

        //   // You can return any component that you like here!
        //   return (
        //     <Ionicons
        //       name={iconName}
        //       size={size}
        //       color={focused ? '#005FAC' : 'black'}
        //     />
        //   );
        // },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {paddingVertical: 5},
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/logo-dark.png')}
              style={{width: 100, resizeMode: 'contain',marginLeft:130}}
            />
          ),
          headerRight: props => <Header navigation={navigation} {...props} />,
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={
                focused
                  ? require("../assets/homeIcon.png")
                  : require("../assets/homeIcon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/logo-dark.png')}
              style={{width: 100, resizeMode: 'contain',marginLeft:130}}
            />
          ),
          headerRight: props => <Header navigation={navigation} {...props} />,
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={
                focused
                  ? require("../assets/categoryIcon.png")
                  : require("../assets/categoryIcon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/logo-dark.png')}
              style={{width: 100, resizeMode: 'contain',marginLeft:130}}
            />
          ),
          headerRight: props => <Header navigation={navigation} {...props} />,
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={
                focused
                  ? require("../assets/heartIcon.png")
                  : require("../assets/heartIcon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/logo-dark.png')}
              style={{width: 100, resizeMode: 'contain',marginLeft:130}}
            />
          ),
          headerRight: props => <Header navigation={navigation} {...props} />,
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={
                focused
                  ? require("../assets/notificationIcon.png")
                  : require("../assets/notificationIcon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/logo-dark.png')}
              style={{width: 100, resizeMode: 'contain',marginLeft:130}}
            />
          ),
          headerRight: props => <Header navigation={navigation} {...props} />,
          headerStyle: {
            backgroundColor: '#F0F0F0',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                height: 25,
                width: 25,
              }}
              source={
                focused
                  ? require("../assets/profileIcon.png")
                  : require("../assets/profileIcon.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabNavigation;
