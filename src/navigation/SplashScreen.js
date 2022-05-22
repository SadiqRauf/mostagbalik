import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';

const SplashScreen = ({navigation}) => {
  const [value, setValue] = useState();
  let val;
  useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Onboarding",)
    }, 2000);
  }, []);

  return (
    <View
      style={{flex:1, backgroundColor:"#65ABEF", justifyContent: 'center', alignItems: 'center', padding: '15%'}}>
     
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
    paddingTop: 10,
    fontSize: 30,
    // fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
});
