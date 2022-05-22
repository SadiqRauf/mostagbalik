/**
 * BarberOne - App
 * Created by Abdullah
 * Copyright © 2022 BarberOne. All rights reserved.
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as Colors from '../../constants/colors';
import * as Typography from '../../constants/typography';

const SwitchButton = props => {
  return (
    <View
      style={styles.buttonsContainerForm 
      }>
      <View
        style={{
          flexDirection: 'row',
          width: wp('92%'),
          alignSelf: 'center',
          height: 50,
          borderColor:Colors.selectedButton,
          borderWidth:1,
          borderRadius:7,
          marginVertical:10
        }}>
          <TouchableOpacity
            style={[
              styles.button,{backgroundColor: props.defaultSelected ? Colors.selectedButton : Colors.White,
                borderTopLeftRadius: 7,
              borderBottomLeftRadius:7,} 
            ]}
            activeOpacity={0.8}
            onPress={() => props.toggleSwitch()}>
            <Text
              style={
                props.defaultSelected
                  ? styles.buttonTextSelected
                  : styles.buttonText
              }>
              {props.defaultSelectedText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button,{
              backgroundColor: props.defaultSelected ? Colors.White : Colors.selectedButton,
              borderTopRightRadius:7,
              borderBottomRightRadius:7} ]}
            onPress={() => props.switchToggle()}>
            <Text
              style={
                props.swicthSelected
                  ? styles.buttonTextSelected
                  : styles.buttonText
              }>
              {props.swicthSelectedText}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: Colors.White,
    width: wp('100%'),
    height: hp('8%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonsContainerForm: {
    backgroundColor: Colors.White,
    width: wp('100%'),
    height: hp('8%'),
    alignItems: 'center',
    marginBottom:10
  },
  buttonWraper: {
    width: wp('45%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex:0.5,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  buttonSelected: {
    flex:0.5,
    backgroundColor: Colors.selectedButton,
    justifyContent: 'center',
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
  },
  buttonText: {
    alignSelf: 'center',
    color: Colors.Black,
    fontSize: Typography.FONT_SIZE_14,
  },
  buttonTextSelected: {
    alignSelf: 'center',
    color: Colors.Gray44,
    fontSize: Typography.FONT_SIZE_14,
  },
});

export default SwitchButton;
