import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Text, VStack} from '@react-native-material/core';
import AppStyles from '../../styles/Styles';
import {TextInput, Checkbox} from 'react-native-paper';
import {Divider} from '@react-native-material/core';

import { postMethod } from '../../helpers';
// import DatePicker from 'react-native-datepicker';
// import SelectDropdown from 'react-native-select-dropdown';

// const genders = ['Male', 'Female', 'Others'];

const Register = ({navigation}) => {
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [mobile, setmobile] = React.useState('');
  const [dob, setdob] = React.useState('');
  const [gender, setgender] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [cpassword, setcpassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  const [rightIcon1, setRightIcon1] = useState('eye');
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [rightIcon2, setRightIcon2] = useState('eye');

  const handlePasswordVisibility1 = () => {
    if (rightIcon1 === 'eye') {
      setRightIcon1('eye-off');
      setPasswordVisibility1(!passwordVisibility1);
    } else if (rightIcon1 === 'eye-off') {
      setRightIcon1('eye');
      setPasswordVisibility1(!passwordVisibility1);
    }
  };
  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === 'eye') {
      setRightIcon2('eye-off');
      setPasswordVisibility2(!passwordVisibility2);
    } else if (rightIcon2 === 'eye-off') {
      setRightIcon2('eye');
      setPasswordVisibility2(!passwordVisibility2);
    }
  };

  const onRegister = async () => {
    try {
      let url = 'users/register';
      var payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: gender,
        phoneNumber: mobile,
        password: password,
        concern:checked
      };
      let response = await postMethod({ url, payload });
      console.log('register res=', response);
      if(response.success){
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
        navigation.navigate("/login");
        setfirstName("");
        setlastName("");
        setemail("");
        setdob("");
        setChecked("");
        setmobile("");
        setgender("");
        setpassword("");
        setcpassword("")
      }else{
        ToastAndroid.show(response.error, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log("register err",e);
      ToastAndroid.show(e.response.error, ToastAndroid.SHORT);
      setfirstName("");
      setlastName("");
      setemail("");
      setdob("");
      setChecked("");
      setmobile("");
      setgender("");
      setpassword("");
      setcpassword("")
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground
          source={require('../../assets/loginHalfBg.png')}
          resizeMode="cover"
          style={styles.imgBg}>
          <View style={{...AppStyles.center, justifyContent: 'center'}}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.img}
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <VStack spacing={'3%'}>
          <View>
            <Text
              style={{
                ...AppStyles.text,
                fontWeight: 700,
                textAlign: 'center',
                fontSize: 30,
                color: 'black',
                marginBottom: 5,
              }}>
              Register
            </Text>
            <Text
              style={{
                ...AppStyles.text,
                fontWeight: 700,
                textAlign: 'center',
                fontSize: 13,
                color: '#005FAC',
              }}>
              Create your new account
            </Text>
            <View style={{marginVertical: '7%'}}>
              <VStack spacing={'4%'}>
                <TextInput
                  label="First Name"
                  value={firstName}
                  mode="outlined"
                  onChangeText={text => setfirstName(text)}
                  theme={{roundness: 20}}
                  right={<TextInput.Icon icon="email" />}
                  style={{backgroundColor:"white"}}
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  mode="outlined"
                  onChangeText={text => setlastName(text)}
                  theme={{roundness: 20}}
                  right={<TextInput.Icon icon="email" />}
                  style={{backgroundColor:"white"}}
                />
                <TextInput
                  label="Email"
                  value={email}
                  mode="outlined"
                  onChangeText={text => setemail(text)}
                  theme={{roundness: 20}}
                  right={<TextInput.Icon icon="email" />}
                  style={{backgroundColor:"white"}}
                />
                <TextInput
                  label="Mobile"
                  value={mobile}
                  mode="outlined"
                  onChangeText={text => setmobile(text)}
                  theme={{roundness: 20}}
                  keyboardType="numeric"
                  right={<TextInput.Icon icon="email" />}
                  style={{backgroundColor:"white"}}
                />
                {/* <DatePicker
                  style={styles.datePickerStyle}
                  date={dob}
                  mode="date"
                  placeholder="select DOB"
                  format="DD/MM/YYYY"
                  // minDate="01-01-1900"
                  // maxDate=""
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: -5,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      borderColor: 'gray',
                      alignItems: 'flex-start',
                      borderWidth: 1,
                      borderRadius: 16,
                    },
                    placeholderText: {
                      fontSize: 17,
                      color: 'gray',
                    },
                    dateText: {
                      fontSize: 17,
                    },
                  }}
                  onDateChange={date => {
                    setdob(date);
                  }}
                /> */}
                <TextInput
                  label="DOB"
                  value={dob}
                  mode="outlined"
                  onChangeText={text => setdob(text)}
                  theme={{roundness: 20}}
                  style={{backgroundColor:"white"}}
                />
                <TextInput
                  label="Gender"
                  value={gender}
                  mode="outlined"
                  onChangeText={text => setgender(text)}
                  theme={{roundness: 20}}
                  style={{backgroundColor:"white"}}
                />
                {/* <SelectDropdown
                  data={genders}
                  // renderDropdownIcon={true}
                  buttonStyle={{
                    borderRadius:20,
                    backgroundColor:"transparent",
                    borderWidth:1,
                    borderColor:'gray',
                    width:345,
                    textAlign:"left",
                    flexDirection:"row",
                    justifyContent:"flex-start"
                  }}
                  placeholder="Select Gender"
                  onSelect={(selectedItem, index) => {
                    setgender(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                /> */}
                <TextInput
                  label="Password"
                  value={password}
                  style={{backgroundColor:"white"}}
                  mode="outlined"
                  onChangeText={text => setpassword(text)}
                  theme={{roundness: 20}}
                  right={
                    <TextInput.Icon
                      onPress={handlePasswordVisibility1}
                      icon={rightIcon1}
                    />
                  }
                />
                <TextInput
                  label="Confirm Password"
                  style={{backgroundColor:"white"}}
                  value={cpassword}
                  mode="outlined"
                  onChangeText={text => setcpassword(text)}
                  theme={{roundness: 20}}
                  right={
                    <TextInput.Icon
                      onPress={handlePasswordVisibility2}
                      icon={rightIcon2}
                    />
                  }
                />
              </VStack>
              <View style={{...AppStyles.center, justifyContent: 'flex-start'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  style={{marginTop: 10, paddingTop: 10}}
                />
                <Text
                  style={{
                    ...AppStyles.text,
                    fontWeight: 700,
                    textAlign: 'left',
                    fontSize: 13,
                    color: '#000000',
                    marginTop: 10,
                  }}>
                  Accept Terms and Conditions & Privacy Policy
                </Text>
              </View>
            </View>
            <TouchableOpacity style={AppStyles.authButton} onPress={onRegister}>
              <Text style={{fontFamily: 'Inter-Bold', color: 'white'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={
              {
                //   ...AppStyles.center,
                //   height: '35%',
                //   justifyContent: 'center',
                //   alignItems:"flex-start",
                //   backgroundColor: 'red',
              }
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Divider
                style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 1,
                  width: 80,
                  marginHorizontal: 20,
                }}
              />
              <Text
                style={{
                  ...AppStyles.text,
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#000000',
                }}>
                or Continue with
              </Text>
              <Divider
                style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 1,
                  width: 80,
                  marginHorizontal: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 10,
              }}>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/fbIcon.png')}
                  style={styles.img}
                />
                <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
                  Facebook
                </Text>
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/googleIcon.png')}
                  style={styles.img}
                />
                <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
                  Google
                </Text>
              </View>
            </View>
            <View style={{marginTop: '5%'}}>
              <Text variant="h6" style={{textAlign: 'center', color: 'gray'}}>
                Already have an account ?{' '}
                <Text
                  variant="h6"
                  onPress={() => navigation.navigate('/login')}
                  style={{textAlign: 'center', color: '#005FAC'}}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </VStack>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  body: {
    paddingVertical: '5%',
    paddingHorizontal: '6%',
    height: '100%',
    overflow: 'hidden',
    // backgroundColor:"red"
  },
  imgBg: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
  },
  img: {
    width: '30%',
    resizeMode: 'contain',
  },
  datePickerStyle: {
    width: 345,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    height: 50,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
