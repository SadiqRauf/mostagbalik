import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';
import Button from '../../components/Button';
import HeaderComponent from '../components/headerComponent';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

import {API} from '../constants/helper';
import ShowAlert from '../components/ShowAlert';

import {useSelector, useDispatch} from 'react-redux';
import {getUser, getInitData} from '../reducers/auth';

const OTPVerification = props => {
  let AppointmentTime = props.route?.params
    ? props.route.params.AppointmentTime
    : '';
  let MobileData = props.route?.params ? props.route?.params?.MobileData : '';
  let purpose_id = props.route?.params ? props.route?.params?.purpose_id : '';
  let note = props.route?.params ? props.route?.params?.note : '';

  const {t, i18n} = useTranslation();
  const [isValidRequest, setIsValidRequest] = useState(false);
  const [code, setCode] = useState('');
  const [counter, SetCounter] = useState(60); // Set here your own timer configurable
  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const doVerifyOTP = async () => {
    let _data = {
      country_code: MobileData.country_code,
      mobile: MobileData.mobile,
      otp_type: MobileData.otp_type,
      otp: parseInt(code),
      platform: Platform.OS,
    };

    try {
      setLoading(true);
      await axios
        .post(`${API}/auth/login`, _data)
        .then(async response => {
          setLoading(false);

          await dispatch(getUser(response.data.data));

          if (response?.data) {
            props.navigation.navigate('AppointmentsConfirmation', {
              AppointmentTime,
              note: note,
              purpose_id: purpose_id,
            });
          } else {
            ShowAlert({
              type: 'error',
              description: 'Please Try Agin',
            });
          }
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

  const submitCode = length => {
    if (length < 5) {
      setIsValidRequest(false);
    } else if (length === 0) {
      setIsValidRequest(false);
    } else if (length === 5) {
      setIsValidRequest(true);
    }
  };
  const handleResend = () => {
    SetRandom(Math.random());
    // Handle Resend otp action here
  };

  return (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <HeaderComponent navigation={props.navigation} />
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>{t('common:Verification_Code')}</Text>
        <Text style={styles.bodyText}>
          {t('common:OTP_Body')} {MobileData.mobile}
        </Text>
      </View>

      <OTPInputView
        style={styles.otpInput}
        pinCount={4}
        code={code}
        onCodeChanged={code => {
          setCode(code);
          submitCode(code.length);
        }}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {}}
      />
      <View style={styles.resendView}>
        <CountDown
          key={random}
          until={counter}
          size={11}
          onFinish={() => setDisabled(() => false)}
          separatorStyle={{color: 'black'}}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: 'black'}}
          timeToShow={['M', 'S']}
          showSeparator
          timeLabels={{m: '', s: ''}}
        />
        <TouchableOpacity onPress={() => alert('RESEND')}>
          <Text style={styles.resendText}>resend</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <Button
          title={'VERIFY'}
          onPress={
            () => doVerifyOTP()
            // props.navigation.push('NextAppointment', {
            //   type: 'otp',
            // })
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerTextView: {
    width: wp('92%'),
    height: hp('18%'),

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Black,
    textAlign: 'center',
    height: hp('6%'),
    color: Colors.Black,
  },
  bodyText: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    lineHeight: 24,
    height: hp('6%'),
  },
  otpInput: {
    width: wp('70%'),
    height: hp('10%'),
    alignSelf: 'center',
  },

  underlineStyleBase: {
    width: wp('10%'),
    height: hp('6%'),
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Colors.light_blue,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    borderColor: Colors.light_blue,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.lightGray,
  },
  resendView: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('10%'),
    width: wp('92%'),
    alignSelf: 'center',
  },
  resendText: {
    fontFamily: 'OpenSans-Regular',
    color: Colors.lightGray,
    marginLeft: wp('1%'),
  },
  btnView: {
    width: wp('92%'),
    alignSelf: 'center',
  },
});

export default OTPVerification;
