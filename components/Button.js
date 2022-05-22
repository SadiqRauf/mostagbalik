import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Button = ({onPress, title = '', leftIcon = '', rightIcon = ''}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.9}>
      <FastImage
        style={styles.iconLeft}
        source={leftIcon}
        resizeMode={'contain'}
      />
      <Text style={styles.text}>{title.toUpperCase()}</Text>
      <FastImage style={styles.icon} source={rightIcon} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#65ABEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    height: hp('2%'),
    width: wp('2%'),
    marginHorizontal: 10,
  },
  iconLeft: {
    height: hp('3%'),
    width: wp('5%'),
    marginHorizontal: 10,
  },
});
