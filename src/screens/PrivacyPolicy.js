import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import HeaderComponent from '../components/headerComponent';
const PrivacyPolicy = props => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <HeaderComponent
        Drawer={true}
        title={t('common:Privacy_Policy')}
        navigation={props.navigation}
      />
      <View style={styles.midContainer}>
        <Text style={styles.text}>{t('common:Privacy_Policy_Text')}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  midContainer: {
    width: wp('92%'),
    alignSelf: 'center',
    marginVertical: hp('2%'),
  },
  text: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 20,
    color: Colors.Gray44,
  },
});

export default PrivacyPolicy;
