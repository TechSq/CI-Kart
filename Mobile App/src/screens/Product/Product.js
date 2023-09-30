//import liraries

import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { getMethod } from '../../helpers';

// create a component
const Product = ({navigation,route}) => {
    const { id,subcategory } = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [ProductList, setProductList] = useState([]);

  const getProductList = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      // console.log("product list res=", response);
      if (response.success) {
        let filtered = response.data.filter((item)=> item.subcategoryUuid == id)
        setProductList(filtered);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search Product"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{backgroundColor:"#F0F0F0"}}
      />
      <Text style={{fontSize:20,marginTop:10,paddingHorizontal:10,color:"black"}}>{subcategory}</Text>
      <View style={{marginVertical: 10,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
        {ProductList?.map((item, i) => (
          <TouchableOpacity key={i} style={styles.categoryView} onPress={()=> navigation.navigate("/productDetails",{id:item.productUuid,product:item})}>
            <Text style={{fontSize:17,marginBottom:5,color:"black"}}>{item.productName}</Text>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri:item?.imageUrl,width:50,height:50}}
                    style={{resizeMode: 'contain'}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 16,marginVertical: 10,color: 'black'}}>
                    {item?.description.slice(0,35)+"..."}
                  </Text>
                </View>
                <Text style={{fontSize: 18,fontWeight:600,textAlign:"center",color: 'black'}}>
                    {item?.category?.categoryName}
                  </Text>
          </TouchableOpacity>
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
  categoryView: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal:15,
    marginHorizontal: 5,
    // height: 110,
    marginVertical: 7,
    flexDirection: 'column',
    width:"47%"
  },
});

//make this component available to the app
export default Product;
