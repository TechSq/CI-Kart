//import liraries

import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { getMethod } from '../../helpers';

// create a component
const Category = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [categoriesList, setcategoriesList] = useState([]);

  const getCategoriesList = async()=>{
    try{
        let url = "common/categories";
        let response = await getMethod({ url });
        // console.log("categories list res=",response.data)
        if(response.success){
          setcategoriesList(response.data)
        }
    }catch(e){
        console.log(e)
    }
  }
  useEffect(()=>{
    getCategoriesList()
  },[])

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search Category"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{backgroundColor:"#F0F0F0"}}
      />
      <View style={{marginVertical: 10}}>
        {categoriesList?.map((item, i) => (
          <TouchableOpacity key={i} style={styles.categoryView} onPress={()=> navigation.navigate("/subcategory",{id:item.categoryUuid,category:item.categoryName})}>
            {i % 2 === 0 ? (
              <>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: 'black',
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}>
                    {item.categoryName}
                  </Text>
                  <Text style={{fontSize: 16,color: 'black'}}>
                    {item?.subCategory?.length > 0
                      ? item?.subCategory?.length
                      : 0}{' '}
                    Products
                  </Text>
                </View>
                <View
                  style={{
                    width: '30%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri:item?.image && item?.image}}
                    style={{resizeMode: 'contain',width:50,height:50}}
                  />
                </View>
              </>
            ) : (
              <>
               <View
                  style={{
                    width: '30%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri:item?.image && item?.image}}
                    style={{resizeMode: 'contain',width:50,height:50}}
                  />
                </View>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: 'black',
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}>
                    {item.categoryName}
                  </Text>
                  <Text style={{fontSize: 16,color: 'black'}}>
                    {item?.subCategory?.length > 0
                      ? item?.subCategory?.length
                      : 0}{' '}
                    Products
                  </Text>
                </View>
               
              </>
            )}
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
    height: 110,
    marginVertical: 7,
    flexDirection: 'row',
  },
});

//make this component available to the app
export default Category;
