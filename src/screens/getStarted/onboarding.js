import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SwiperComponent from '../../../components/swiper';
import Swiper from 'react-native-swiper';
import Button from '../../../components/Button';
import * as Colors from '../../constants/colors';

const windowHeight = Dimensions.get('window').height;

const Onboarding = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <View>
        <StatusBar backgroundColor={Colors.statusBar2} translucent />
        <View style={styles.wrapper}>
          <Swiper
            style={styles.wrapper}
            dotColor={'red'}
            activeDotColor={'blue'}
            loop={false}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}>
            <SwiperComponent image={require('../../assets/1.png')} />
            <SwiperComponent image={require('../../assets/2.png')}/>
            <SwiperComponent image={require('../../assets/3.png')}/>
          </Swiper>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t('common:GET_STARTED')}
          onPress={() => navigation.navigate('Drawer')}
          rightIcon={require('../../assets/leftArrow.png')}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  wrapper: {
    height: windowHeight >= 850 ? hp('82%') : hp('85%'),
    backgroundColor: Colors.White,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 35 : 5,
    right: 10,
    left: 10,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 22,
    height: 3,
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp('2%'),
  },
  activeDot: {
    backgroundColor: Colors.San_Marino,
    width: 22,
    height: 4,
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp('2%'),
  },
});
