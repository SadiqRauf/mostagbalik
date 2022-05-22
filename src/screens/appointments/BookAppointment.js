import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {t} from 'i18next';
import axios from 'axios';
import moment from 'moment';
import * as Colors from '../../constants/colors';
import * as Typography from '../../constants/typography';
import Button from '../../../components/Button';
import HeaderComponent from '../../components/headerComponent';
import ShowAlert from '../../components/ShowAlert';
import {API} from '../../constants/helper';
import Loader from '../../components/Spinner';

const BookAppointment = props => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      doFetchTimeSlots();
    });
    return () => {
      unsubscribe;
    };
  }, [date]);

  const doFetchTimeSlots = async () => {
    let booking_date = date;
    try {
      setLoading(true);
      await axios
        .post(`${API}/timeslots`, {booking_date})
        .then(response => {
          setTimeSlots(response.data?.data?.slots);
          setLoading(false);

          // console.log('Responce...', response.data.data.slots);
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
  const onHendalNavigation = () => {
    let startTime = moment(
      date + 'T' + selectedTimeSlot.slot_start_time,
    ).format();
    let endTime = moment(date + 'T' + selectedTimeSlot.slot_end_time).format();
    let AppointmentTime = {
      startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
    };

    props.navigation.navigate('NextAppointment', {AppointmentTime});
  };
  const separator = () => {
    return <View style={{height: hp('1%')}} />;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.timeView,
          item == selectedTimeSlot
            ? {backgroundColor: Colors.San_Marino}
            : null,
        ]}
        onPress={() => setSelectedTimeSlot(item)}>
        <Text
          style={[
            styles.timeTxt,
            {
              color:
                item.time == selectedTimeSlot ? Colors.White : Colors.Black,
            },
          ]}>
          {moment(date + 'T' + item.slot_start_time).format('HH:MM')}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader visible={loading} />
      <StatusBar backgroundColor={Colors.statusBar} translucent />
      <HeaderComponent
        navigation={props.navigation}
        title={t('common:Book_Appointment')}
      />
      <View style={styles.container}>
        <View style={styles.CalendarContainer}>
          <Text style={styles.headerTxt}>{t('common:SELECT_DATE')}</Text>
          <Calendar
            // Initially visible month. Default = now
            current={date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2080-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              setDate(day.dateString);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting

            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {}}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </View>
        <View style={styles.BottomContainer}>
          <Text style={styles.headerTxt}>{t('common:AVAILABLE_SLOTS')}</Text>

          <FlatList
            data={timeSlots}
            renderItem={renderItem}
            key={index => index}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={separator}
            extraData={item => '_' + item.selected}
            numColumns={4}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        {selectedTimeSlot ? (
          <Button title={'Next'} onPress={() => onHendalNavigation()} />
        ) : (
          <Button
            title="Save"
            onPress={() =>
              ShowAlert({
                type: 'error',
                description: 'Please Select Time Slot',
              })
            }
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    width: wp('92%'),
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  CalendarContainer: {
    height: hp('45%'),
  },
  headerTxt: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 19,
    color: Colors.Gray44,
    marginBottom: 10,
    marginHorizontal: hp('2%'),
  },
  timeView: {
    marginHorizontal: hp('2%'),
    width: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('4%'),
    borderRadius: hp('1%'),
  },
  timeTxt: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: 'OpenSans-Medium',
    lineHeight: 22,
    textAlign: 'center',
    justifyContent: 'center',
  },
  BottomContainer: {
    width: wp('92%'),
    alignSelf: 'center',
    marginTop:"9%",
  },
  btnContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 35 : 5,
    left: 10,
    right: 10,
  },
});
export default BookAppointment;
