//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import { deleteMethod, getMethod } from '../../helpers';

// create a component
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const getCartList = async()=>{
    try{
        let url = "customers/secure/cart";
        let token = await AsyncStorage.getItem("@token")
        let response = await getMethod({ url,token });
        // console.log("cart list=",response.data)
        if(response.success){
            setCartList(response.data.orderItems);
        }
    }catch(e){
        console.log(e)
    }
  }
  useEffect(()=>{
    getCartList()
  },[])

  const removeFromCart = async (item) => {
    try {
      let url = `customers/secure/cart/${item?.productUuid}?`;
      var payload = {
        productId: item?.productUuid,
      };
      let token = await AsyncStorage.getItem("@token")
      let response = await deleteMethod({ url, payload, token });
      console.log("remove cart res",response)
      if (response) {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        getCartList()
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
};

  return (
    <ScrollView style={styles.container}>
        <Text style={{fontSize:20,color:"black",marginBottom:10}}>({cartList?.length}) Products in Cart</Text>
      <View style={styles.cartContainer}>
        {cartList?.map((item,i) => (
          <View key={i} style={styles.categoryView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={{fontSize: 16, color: 'black'}}>
                ⭐4.6
              </Text>
            </View>
            <View style={styles.innerCatView}>
            <View
              style={{
                width: '20%',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
               
              }}>
              <Image
                source={{uri: item?.imageUrl}}
                style={{resizeMode: 'contain', width: 50, height: 50}}
              />
            </View>
            <View
              style={{
                width: '80%',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
             
              }}>
                
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                {item.productName}
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                Rs. {item?.price}
              </Text>
            </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>removeFromCart(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
               <Image 
                source={require("../../assets/delete.png")}
                style={{resizeMode: 'contain', width: 25, height: 25}}
              />
            </TouchableOpacity>
            <View
          style={{
            backgroundColor: "#1E1E1E",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between",
            borderRadius: 14,
            paddingVertical: "2%",
            paddingHorizontal:"5%",
            width:100
            // marginHorizontal:"20%"
          }}
        >
          <Text  style={{
              color: "white",
              fontSize: 15,
            }}>-</Text>
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            1
          </Text>
          <Text  style={{
              color: "white",
              fontSize: 15,
            }}>+</Text>
            </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  cartContainer: {
    // backgroundColor: 'lightgray',
  },
  categoryView: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal:15,
    marginHorizontal: 5,
    paddingVertical:10,
    marginBottom:15
  },
  innerCatView:{
    flexDirection: 'row',
    marginVertical:10
    // paddingVertical: 10,
  }
});

//make this component available to the app
export default Cart;
