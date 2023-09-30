//import liraries
import { VStack } from '@react-native-material/core';
import React, { Component, useState } from 'react';
import AppStyles from "../../styles/Styles"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { postMethod } from '../../helpers';
// import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

// create a component
const sizes = ["S","M","L","XL","XXL"];
const colors = ["#000","#FF0000","#008000"];
const ProductDetails = ({navigation,route}) => {
    const [productSize,setProductSize] = useState("L");
    const { id,product } = route.params;
    const User = useSelector(state => state.data);
    // const UserToken = useSelector(state => state.data.token);

    const addToCart = async()=>{
      if(!User){
        ToastAndroid.show("Please login to continue", ToastAndroid.SHORT);
      }else{
        try{
          let url = `customers/secure/cart/${product?.productUuid}?quantity=1`;
          var payload = {
            productId: product?.productUuid,
            quantity: 1,
          };
          let token = await AsyncStorage.getItem("@token")
          let response = await postMethod({ url, payload,token });
          navigation.navigate("/cart")
          console.log("cart res=",response)
          if(response){
            ToastAndroid.show(response.message, ToastAndroid.SHORT);
          }else{
            ToastAndroid.show(response.message, ToastAndroid.SHORT);
          }
        }catch(e){
          console.log(e)
          ToastAndroid.show(e.response.message, ToastAndroid.SHORT);
        }
      }
      }

      const addToWishlist = async()=>{
        if(!User){
          ToastAndroid.show("Please login to continue", ToastAndroid.SHORT);
        }else{
          try{
            let url = `customers/secure/wishlist/${product?.productUuid}?quantity=1`;
            var payload = {
              productId: product?.productUuid,
              quantity: 1,
            };
            let token = await AsyncStorage.getItem("@token")
            let response = await postMethod({ url, payload,token });
            navigation.navigate("/wishlist")
            console.log("wishlist res=",response)
            if(response){
              ToastAndroid.show(response.message, ToastAndroid.SHORT);
            }else{
              ToastAndroid.show(response.message, ToastAndroid.SHORT);
            }
          }catch(e){
            console.log(e)
            ToastAndroid.show(e.response.message, ToastAndroid.SHORT);
          }
        }
        
      }

      const placeToOrder = async()=>{
        if(!User){
          ToastAndroid.show("Please login to continue", ToastAndroid.SHORT);
        }else{
          try{
            let url = `customers/secure/cart/placeorder`;
            var payload = {
              itemId: product?.productUuid,
            };
            let token = await AsyncStorage.getItem("@token")
            let response = await postMethod({ url, payload,token });
            if(response){
              ToastAndroid.show(response.message, ToastAndroid.SHORT);
            }else{
              ToastAndroid.show(response.message, ToastAndroid.SHORT);
            }
          }catch(e){
            console.log(e)
            ToastAndroid.show(e.response.message, ToastAndroid.SHORT);
          }
        }
        }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imgBox}>
            <Image
                    source={{uri:product?.imageUrl,height:"100%",width:"100%"}}
                    style={{resizeMode: 'contain'}}
                  />
            </View>
            <View style={styles.textContent}>
                <Text style={{fontSize:22,color:"black",fontWeight:"bold"}}>{product.productName}</Text>
            </View>
            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                <Text>Rs. 500</Text>
                <Text>4.8 (157)</Text>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontWeight:"bold",color:"black"}}>Product Description</Text>
                <Text>{product?.description}</Text>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontWeight:"bold",color:"black",marginBottom:5}}>Colors</Text>
                <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                  {
                    colors.map((size,i)=>(
                      <TouchableOpacity key={i} onPress={()=> setProductSize(size)}
                      style={{
                        backgroundColor: size,
                        borderColor:"gray",
                        borderWidth:2,
                        borderRadius:100,
                        padding:"2%",
                        marginRight:10,
                        height:35,
                        width:35,
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems:"center"}}>
                        <View style={{backgroundColor:size}}></View>
                      </TouchableOpacity>
                    ))
                  }
              </View>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontWeight:"bold",color:"black",marginBottom:5}}>Size</Text>
                <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                  {
                    sizes.map((size,i)=>(
                      <TouchableOpacity key={i} onPress={()=> setProductSize(size)}
                      style={{
                        backgroundColor: productSize === size ? "#005FAC" : "#F0F0F0",
                        borderRadius:100,
                        padding:"2%",
                        marginRight:10,
                        height:35,
                        width:35,
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems:"center"}}>
                        <Text style={{color:productSize === size ? "white" : "black"}}>{size}</Text>
                      </TouchableOpacity>
                    ))
                  }
              </View>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontWeight:"bold",color:"black"}}>Seller Information</Text>
                <Text>ABC, Company, Coimbatore</Text>
            </View>
            <VStack spacing={'5%'}>
                <TouchableOpacity onPress={addToWishlist}
                  style={AppStyles.outlineButton}>
                  <Text style={{color: 'black'}}>
                    Add to Wishlist
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToCart}
                  style={AppStyles.authButton}>
                  <Text style={{color: 'white'}}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={placeToOrder}
                  style={AppStyles.authButton}>
                  <Text style={{color: 'white'}}>
                    Place Order
                  </Text>
                </TouchableOpacity>
              </VStack>
              <View style={{marginVertical:10}}>
                <Text style={{fontWeight:"bold",color:"black"}}>Rating & Review</Text>
                <Text>...</Text>
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
    imgBox:{
        height:200,
        borderRadius:15,
        backgroundColor:"#F0F0F0",
        overflow:"hidden"
    },
    textContent:{
        marginVertical:10
    }
});

//make this component available to the app
export default ProductDetails;
