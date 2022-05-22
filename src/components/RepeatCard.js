import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';

const InputWithLabels = props => {
  return (
    <>
      <View style={styles.normalStyleIcon}>
        <TouchableOpacity
          style={styles.inputContainerIcon}
          onPress={props.onPress}>
          <Text
            style={props?.type ? styles.inputStyles : styles.inputStylesIcon}>
            {props.bodyText}
          </Text>

          {props?.removeIcons ? null : (
            <FastImage
              source={require('../assets/down_arrow.png')}
              resizeMode="contain"
              style={styles.iconStyle}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainerIcon: {
    flexDirection: 'row',
    width: wp('92%'),
    justifyContent: 'center',
    zIndex: 0,
  },
  iconStyle: {
    width: wp('5%'),
    height: hp('5%'),
    alignSelf: 'center',
  },
  inputStylesIcon: {
    width: wp('77%'),
    color: '#999999',
    fontSize: Typography.FONT_SIZE_14,
    // fontFamily: Typography.FONT_FAMILY_BOLD,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    width: wp('77%'),
    color: '#999999',
    fontSize: Typography.FONT_SIZE_12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  normalStyleIcon: {
    width: wp('92%'),
    height: hp('7%'),

    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: Colors.Black,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    backgroundColor: Colors.White,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 4,
    // marginTop: wp('2%'),
  },
});

export default InputWithLabels;
