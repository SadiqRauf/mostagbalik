import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';
import Button from '../../components/Button';
import HeaderComponent from '../components/headerComponent';
import {API, getHeaders} from '../constants/helper';
import ShowAlert from '../components/ShowAlert';
import moment from 'moment';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getInitData} from '../reducers/auth';

const AppointmentsConfirmation = props => {
  let AppointmentTime = props.route?.params
    ? props.route.params.AppointmentTime
    : '';
  let purpose_id = props.route?.params ? props.route?.params?.purpose_id : '';
  let note = props.route?.params ? props.route?.params?.note : '';
  const selector = useSelector(getUser);
  const [loading, setLoading] = useState(false);

  const {t, i18n} = useTranslation();

  const doAddAppointment = async () => {
    const header = await getHeaders(
      selector.payload.user.userData.access_token,
    );
    let _data = {
      purpose_id: purpose_id,
      note: note,
      start_datetime: AppointmentTime.startTime,
      end_datetime: AppointmentTime.endTime,
    };
    console.log(API, 'user.....', _data, 'header....', header);
    try {
      setLoading(true);
      await axios
        .post(`${API}/booking/store`, _data, header)
        .then(response => {
          setLoading(false);
          console.log('responce...', response);
        })
        .catch(error => {
          setLoading(false);

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

  return (
    <>
      <HeaderComponent
        navigation={props.navigation}
        title={t('common:Appointment_Confirmation')}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.White,
        }}>
        <View style={styles.midContainer}>
          <FastImage
            style={styles.icon}
            resizeMode={'contain'}
            source={require('../assets/confirmed.png')}
          />
          <Text style={styles.headerText}>
            {t('common:Thanks-for_booking')}
          </Text>
          <Text style={styles.bodyTxt}>
            {t('common:Thanks_for_Booking_body')}
            {moment(AppointmentTime.startTime).format('DD MMM yyyy, hh:mm a')}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'ADD TO CALENDAR'}
            leftIcon={require('../assets/calenderIcon.png')}
            onPress={() => doAddAppointment()}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  midContainer: {
    width: wp('92%'),
    height: hp('65%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    alignSelf: 'center',
    // shadowColor: '#171717',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 2,
  },
  icon: {
    width: wp('50%'),
    height: hp('20'),
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.Black,
    lineHeight: 40,
    fontSize: 29,
    marginVertical: hp('3%'),
    color: Colors.Black,
  },
  bodyTxt: {
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 24,
    color: Colors.Gray44,
  },
  btnContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 35 : 5,
    left: 10,
    right: 10,
  },
});

export default AppointmentsConfirmation;
