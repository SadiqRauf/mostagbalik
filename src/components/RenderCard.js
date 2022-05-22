import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import * as Typography from '../constants/typography';
import * as Colors from '../constants/colors';

const RenderCard = ({selectedData, realData, renderData}) => {
  return (
    <TouchableOpacity
      style={styles.BussinessTypeView}
      onPress={() => {
        selectedData(renderData);
      }}>
      <Text style={styles.bussinessTypeText}>{renderData.name.toString()}</Text>
      {realData == renderData ? (
        <FastImage
          source={require('../assets/green_check.png')}
          style={styles.checkIcon}
        />
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  BussinessTypeView: {
    width: wp('92%'),
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: hp('0.05%'),
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  bussinessTypeText: {
     color: Colors.Black,
    fontSize: Typography.FONT_SIZE_15,
    fontFamily:"OpenSans-Regular",
    lineHeight:22,
  },
  checkIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginEnd:10
  },
});

export default RenderCard;
