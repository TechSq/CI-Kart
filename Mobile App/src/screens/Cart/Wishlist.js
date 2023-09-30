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
import {deleteMethod, getMethod} from '../../helpers';

// create a component
const Wishlist = () => {
  const [wishlist, setwishlist] = useState([]);
  const getwishlist = async () => {
    try {
      let url = 'customers/secure/wishlist';
      let token = await AsyncStorage.getItem('@token');
      let response = await getMethod({url, token});
      // console.log("cart list=",response.data)
      if (response.success) {
        setwishlist(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getwishlist();
  }, []);

  const removeFromWishlist = async item => {
    try {
      let url = `customers/secure/wishlist/${item?.productUuid}?`;
      var payload = {
        productId: item?.productUuid,
      };
      let token = await AsyncStorage.getItem('@token');
      let response = await deleteMethod({url, payload, token});
      console.log('remove wish res', response);
      if (response) {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        getwishlist();
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{fontSize: 20, color: 'black', marginBottom: 10}}>
        ({wishlist?.length}) Products in Wishlist
      </Text>
      <View style={styles.cartContainer}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {wishlist?.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.categoryViewWish}
              onPress={() =>
                navigation.navigate('/productDetails', {
                  id: item.productUuid,
                  product: item,
                })
              }>
              <Text style={{fontSize: 17, marginBottom: 5, color: 'black'}}>
                {item.productName.slice(0, 14) + '...'}
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: item?.imageUrl, width: 90, height: 90}}
                  style={{resizeMode: 'contain'}}
                />
              </View>
              <Text style={{fontSize: 13, marginVertical: 10}}>
                {item?.description.slice(0, 25) + '...'}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                
                <TouchableOpacity  
                 style={{
                    backgroundColor: "#1E1E1E",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"center",
                    borderRadius: 14,
                    paddingVertical: "2%",
                    paddingHorizontal:"5%",
                    width:100
                    // marginHorizontal:"20%"
                  }}>
                   <Text style={{fontSize: 13,color:"white",marginVertical:6}}>
                Add To Cart
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeFromWishlist(item)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={require('../../assets/delete.png')}
                    style={{resizeMode: 'contain', width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingHorizontal: 15,
    marginHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 15,
  },
  innerCatView: {
    flexDirection: 'row',
    marginVertical: 10,
    // paddingVertical: 10,
  },
  categoryViewWish: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    // height: 110,
    marginVertical: 7,
    flexDirection: 'column',
    width: '47%',
  },
});

//make this component available to the app
export default Wishlist;
