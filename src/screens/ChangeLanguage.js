import {View, Text} from 'react-native';
import React from 'react';
import HeaderComponent from '../components/headerComponent';

const ChangeLanguage = (props) => {
  return (
    <View style={{flex:1}}>
    <HeaderComponent Drawer={true} title={"Change Language"} navigation={props.navigation}/>
      <Text>ChangeLanguage</Text>
    </View>
  );
};

export default ChangeLanguage;
