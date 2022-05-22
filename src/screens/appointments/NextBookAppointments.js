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
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as Colors from '../../constants/colors';
import * as Typography from '../../constants/typography';
import Button from '../../../components/Button';
import RepeatCard from '../../components/RepeatCard';
import ModalListView from '../../components/ModalListView';
import RenderCard from '../../components/RenderCard';
import HeaderComponent from '../../components/headerComponent';
import ShowAlert from '../../components/ShowAlert';
import {API} from '../../constants/helper';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getInitData} from '../../reducers/auth';

const NextBookAppointments = props => {
  const {t, i18n} = useTranslation();
  let type = props.route?.params ? props.route.params.type : '';
  let AppointmentTime = props.route?.params
    ? props.route.params.AppointmentTime
    : '';

  const [appointmentsVisibility, setAppointmentsVisibility] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedpurpose, setselectedpurpose] = useState({});
  const [purposeData, setPurposeData] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');

  const initialData = useSelector(getInitData);
  const selector = useSelector(getUser);

  useEffect(() => {
    setPurposeData(initialData.payload.user.init_Data.purposes);
  }, []);
  const doRegisterMobileNo = async () => {
    if (mobileNo == '' && purpose.id == undefined && note == '') {
      alert('fuck');
      return;
    }
    let _data = {
      country_code: '+965',
      mobile: mobileNo,
      otp_type: 1,
    };
    try {
      setLoading(true);
      await axios
        .post(`${API}/auth/login`, _data)
        .then(response => {
          setLoading(false);

          if (response.data.errors == false) {
            props.navigation.navigate('OTPVerification', {
              AppointmentTime,
              MobileData: _data,
              purpose_id: purpose.id,
              note: note,
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

  const onPurposeData = item => {
    setPurpose(item);
    setAppointmentsVisibility(false);
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onAppointment = () => {
    props.navigation.navigate('AppointmentsConfirmation', {
      AppointmentTime,
      note: note,
      purpose_id: purpose.id,
    });
  };
  return (
    <KeyboardAwareScrollView style={{backgroundColor: Colors.White}}>
      <HeaderComponent
        navigation={props.navigation}
        title={t('common:Book_Appointment')}
      />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.txt}>{t('common:PURPOSE_OF_VISIT')}</Text>
          <RepeatCard
            type={false}
            onPress={() => setAppointmentsVisibility(true)}
            icon={true}
            bodyText={purpose == '' ? 'Select Purpose Of Visit' : purpose.name}
          />
          {appointmentsVisibility == true && (
            <ModalListView
              data={purposeData}
              renderItem={item => (
                <RenderCard
                  realData={purpose}
                  renderData={item}
                  selectedData={onPurposeData}
                  date={purposeData}
                  typeCB={t('common:PURPOSE_OF_VISIT')}
                />
              )}
              title={t('common:PURPOSE_OF_VISIT')}
              visiblity={appointmentsVisibility}
              changeVisibility={() => setAppointmentsVisibility(false)}
            />
          )}

          <Text style={styles.txt}>{t('common:NOTE')}</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.input}
            onChangeText={text => setNote(text)}
          />
          {selector.payload.user.userData.access_token ? null : (
            <>
              <Text style={styles.txt}>{t('common:MOBILE_NUMBER')}</Text>
              <TextInput
                placeholder={t('common:MOBILE_NUMBER')}
                style={styles.inputs}
                keyboardType={'phone-pad'}
                value={mobileNo}
                onChangeText={text => setMobileNo(text)}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={type ? 'CONFIRM BOOKING' : 'CONTINUE'}
          onPress={
            () =>
              selector.payload.user.userData.access_token
                ? onAppointment()
                : doRegisterMobileNo()
            // type
            //   ? props.navigation.navigate('AppointmentsConfirmation')
            //   : props.navigation.navigate('OTPVerification')
          }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    width: wp('92%'),

    height: hp('91%'),
  },
  input: {
    height: hp('20%'),
    borderColor: Colors.lightGray,
    borderWidth: hp('0.1%'),
    padding: 10,
    borderRadius: hp('1%'),
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  inputs: {
    height: hp('6%'),
    borderColor: Colors.lightGray,
    borderWidth: hp('0.1%'),
    padding: 10,
    borderRadius: hp('1%'),
  },
  txt: {
    height: hp('4%'),
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.text,
    fontFamily: 'OpenSans-Medium',
    textAlignVertical: 'center',
    marginTop: hp('2%'),
  },
  btnContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 35 : 1,
    left: 10,
    right: 10,
  },
});
export default NextBookAppointments;
