import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

import * as Colors from '../../constants/colors';
import * as Typography from '../../constants/typography';

const MyAppointmentCard = () => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.secondView}>
        <Text style={styles.title}>{t('common:Abroad_Studies')}</Text>
        <View style={styles.midView}>
          <FastImage
            style={styles.icon}
            source={require('../../assets/calendar.png')}
            tintColor={Colors.lightGray}
          />
          <Text style={styles.dateText}>2 April 2022</Text>
        </View>
        <View style={styles.midView}>
          <FastImage
            style={styles.icon}
            source={require('../../assets/watch.png')}
            tintColor={Colors.lightGray}
          />
          <Text style={styles.dateText}>10:30</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('92%'),
    height: hp('13.5%'),
    borderColor: Colors.lightGray,
    borderWidth: wp('0.1'),
    alignSelf: 'center',
    borderRadius: wp('2%'),
  },
  secondView: {
    alignSelf: 'center',
    width: wp('80%'),
    justifyContent: 'center',
  },
  midView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('4%'),
  },
  title: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.Gray44,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 22,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  dateText: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.lightGray,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 19,
    marginStart: wp('3%'),
    marginTop: 3,
  },
});
export default MyAppointmentCard;
