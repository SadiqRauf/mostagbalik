import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  StatusBar,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {initData} from '../../actions/auth';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Typography from '../../constants/typography';
import * as Colors from '../../constants/colors';
import Header from './components/header';
import Button from '../../../components/Button';
import Card from './components/card';
import Swiper from 'react-native-swiper';
import AboutModal from './components/aboutModal';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import HeaderComponent from '../../components/headerComponent';
import {useNavigation} from '@react-navigation/native';
import ShowAlert from '../../components/ShowAlert';
import {API} from '../../constants/helper';
import Loader from '../../components/Spinner';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getInitData} from '../../reducers/auth';

const windowHeight = Dimensions.get('window').height;

const Home = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {t, i18n} = useTranslation();
  const [lng, setLng] = useState('en');
  const [addlng, setaddLng] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const selector = useSelector(getInitData);
  const dispatch = useDispatch();

  useEffect(() => {
    doFetchInitData();
    // console.log('result...', result);
  }, []);

  const doFetchInitData = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${API}/init`)
        .then(async response => {
          setLoading(false);
          dispatch(getInitData(response.data.data));
          // await props.onSaveInitData(response.data.data);
          // console.log('responce...', response.data.data);
        })
        .catch(error => {
          setLoading(false);
          console.log('error..');
          ShowAlert({
            type: 'error',
            description: error?.response?.data?.message,
          });
        });
    } catch (error) {
      setLoading(false);
      ShowAlert({type: 'error', description: error?.response?.data?.message});
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setLanguage = code => {
    setLng(code);
    setaddLng(true);
    if (code == 'ar') I18nManager.forceRTL(true);

    if (code == 'en') I18nManager.forceRTL(false);

    i18n.changeLanguage(code);
    RNRestart.Restart();
    setTimeout(() => {
      setaddLng(false);
    }, 1000);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <StatusBar backgroundColor={Colors.statusBar2} translucent />
      {/* <View style={{justifyContent:'space-around',flexDirection:'row',marginTop:15}}>
  
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={() => setLanguage("en")}
  >
    <Text style={[styles.elementText,{color:"white",fontSize:17,textTransform:'none'}]}>
      EN
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={() => setLanguage("ar")}
  >
    <Text style={[styles.elementText,{color:"white",fontSize:17,textTransform:'none'}]}>AR</Text>
  </TouchableOpacity>


</View> */}

      <HeaderComponent Home={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Loader visible={loading} />
        <View style={styles.headerImg}>
          <FastImage
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/Group.png')}
          />
        </View>
        <Header onPress={toggleModal} />
        <View style={{backgroundColor: '#f7fbfe', paddingBottom: hp('5%')}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: 15,
            }}>
            <View style={{flex: 0.9}}>
              <Text style={styles.title}>
                {t('common:Provide_Mostagbalik')}
              </Text>

              <View style={styles.bottom} />
            </View>
            <FastImage
              style={styles.img}
              resizeMode={'contain'}
              source={require('../../assets/rowsImgLeft.png')}
            />
          </View>
          <Card
            title={t('common:Abroad_Studies')}
            description={t('common:Abroad_Description')}
          />
          <Card
            title={t('common:Further_Education')}
            description={t('common:Further_Description')}
          />
          <Card
            title={t('common:Expert_Consultancy')}
            description={t('common:Expert_Description')}
          />
        </View>
        <View>
          <View
            style={{
              marginBottom: '15%',
              paddingVertical: 15,
              backgroundColor: '#fff',
            }}>
            <FastImage
              style={styles.img}
              resizeMode={'contain'}
              source={require('../../assets/rowsImg.png')}
            />
            <View style={{paddingHorizontal: '10%'}}>
              <Text style={styles.aboutUsTitle}>
                {t('common:WhatClientSay')}
              </Text>
              <View style={styles.bottom} />
            </View>

            <Swiper
              style={{height: windowHeight <= 850 ? hp('45%') : hp('40%')}}
              dotColor={'red'}
              activeDotColor={'blue'}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}
              loop={false}
              index={3}>
              <View style={styles.Card}>
                <FastImage
                  source={require('../../assets/coma.png')}
                  style={styles.comma}
                />
                <Text style={styles.cardDescription}>
                  {t('common:ClientDescription')}
                </Text>
                <Text style={styles.name}>{t('common:Client_Name')}</Text>
              </View>
              <View style={styles.Card}>
                <FastImage
                  source={require('../../assets/coma.png')}
                  style={styles.comma}
                />
                <Text style={styles.cardDescription}>
                  {t('common:ClientDescription')}
                </Text>
                <Text style={styles.name}>{t('common:Client_Name')}</Text>
              </View>
              <View style={styles.Card}>
                <FastImage
                  source={require('../../assets/coma.png')}
                  style={styles.comma}
                />
                <Text style={styles.cardDescription}>
                  {t('common:ClientDescription')}
                </Text>
                <Text style={styles.name}>{t('common:Client_Name')}</Text>
              </View>
            </Swiper>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={t('common:BOOK_AN_APPOINTMENT')}
          leftIcon={require('../../assets/calenderIcon.png')}
          onPress={() => props.navigation.navigate('BookAppointment')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  headerImg: {
    height: hp('22%'),
    width: wp('100%'),
    // paddingRight:35
  },
  btnContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 25,
    left: 10,
    right: 10,
  },
  bottom: {
    borderBottomColor: '#65ABEF',
    borderBottomWidth: hp('0.2%'),
    width: wp('20%'),
    alignSelf: 'center',
    borderRadius: 3,
    marginVertical: 5,
  },
  title: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: 'OpenSans-ExtraBold',
    color: Colors.Black,
    lineHeight: 33,
    textAlign: 'center',
    marginTop: '10%',
  },
  img: {
    height: hp('7%'),
    width: wp('17%'),
    // alignSelf:'flex-end'
  },
  aboutUsTitle: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: 'OpenSans-ExtraBold',
    color: Colors.Black,
    lineHeight: 33,
    textAlign: 'center',
    marginTop: '8%',
    // marginRight: 5,
    color: Colors.Black,
  },
  Card: {
    borderBottomColor: Colors.light_blue,
    backgroundColor: Colors.White,
    shadowColor: Colors.Black,
    borderRadius: 12,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 6,
    marginVertical: 15,
    padding: 15,
    borderBottomWidth: 8,
  },
  cardDescription: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.description_gray,
    fontFamily: 'OpenSans-Regular',
    alignSelf: 'center',
    lineHeight: 24,
  },
  name: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.Black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 15,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 22,
    height: 3,
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: hp('1%'),
  },
  activeDot: {
    backgroundColor: Colors.San_Marino,
    width: 22,
    height: 3,
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: hp('1%'),
  },
  comma: {
    height: hp(4),
    width: wp(12),
    marginBottom: 8,
  },
});

export default Home;
