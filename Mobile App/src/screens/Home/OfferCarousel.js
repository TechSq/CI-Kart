//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppStyles from '../../styles/Styles';

const Offers = [
  {
    id: 1,
    offer: 50,
    code: 'FSCREATION0067',
    button: 'Get Now',
    image: require("../../assets/category/categoryImg2.png"),
  },
  {
    id: 2,
    offer: 70,
    code: 'FSCREATION0067',
    button: 'Get Now',
    image: require("../../assets/category/categoryImg1.png"),
  },
];

const Item = ({offer, code, button,image}) => (
  <TouchableOpacity style={styles.item}>
    <View style={{width: '50%', height: '100%', padding: 10}}>
      <Text style={styles.categoryInsideText}>{offer} % Off</Text>
      <Text style={{fontSize: 12, color: 'black',marginBottom:5}}>With code:{code}</Text>
      <TouchableOpacity style={{...AppStyles.authButton,height:30}}>
              <Text style={{fontFamily: 'Inter-Bold', color: 'white'}}>
                {button}
              </Text>
            </TouchableOpacity>
    </View>
    <View style={{width: '50%', height: '100%',padding: 10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Image
              source={image}
              style={{resizeMode: 'cover',width:130,height:130}}
            />
    </View>
  </TouchableOpacity>
);
// create a component
const OfferCarousel = () => {
  const renderItem = ({item}) => (
    <Item offer={item.offer} code={item.code} button={item.button} image={item.image}/>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Offers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 8,
    marginRight: 10,
    width: 260,
    height: 150,
    flexDirection:"row"
  },
    categoryInsideText:{
    color:"black",
    fontWeight:"bold",
    fontSize:25,
    marginBottom:5
  }
});

//make this component available to the app
export default OfferCarousel;
