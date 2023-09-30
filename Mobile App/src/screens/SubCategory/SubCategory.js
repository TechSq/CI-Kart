//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { getMethod } from '../../helpers';

// create a component
const SubCategory = ({navigation,route}) => {
    const { id,category } = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [SubCategoryList, setSubCategoryList] = useState([]);

  const getSubCategoryList = async()=>{
    try{
        let url = "subcategories/get_subcategories";
        let response = await getMethod({ url });
        // console.log("sub categories list res=",response.data)
        if(response.success){
          let filtered = response.data.filter((item)=> item.categoryUuid == id)
          setSubCategoryList(filtered);
        }
    }catch(e){
        console.log(e)
    }
  }
  useEffect(()=>{
    getSubCategoryList()
  },[])

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search Subcategory"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{backgroundColor:"#F0F0F0"}}
      />
      <Text style={{fontSize:20,marginTop:10,paddingHorizontal:10,color:"black"}}>{category}</Text>
      <View style={{marginVertical: 10}}>
        {SubCategoryList?.map((item, i) => (
          <TouchableOpacity key={i} style={styles.categoryView} onPress={()=> navigation.navigate("/products",{id:item.subcategoryUuid,subcategory:item.subcategoryName})}>
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
                    {item.subcategoryName}
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
                    source={{uri:item?.imageUrl,width:50,height:50}}
                    style={{resizeMode: 'contain'}}
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
                    source={{uri:item?.imageUrl}}
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
                    {item.subcategoryName}
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
export default SubCategory;
