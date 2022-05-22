import {View, Text, FlatList, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import SwitchButton from '../../components/appointmentComponents/SwitchButton';
import MyAppointmentCard from '../../components/appointmentComponents/MyAppointmentCard';
import HeaderComponent from '../../components/headerComponent';
import * as Colors from '../../constants/colors';
const MyAppointments = props => {
  const {t, i18n} = useTranslation();
  const [upComming, setUpComming] = useState(true);
  const [archive, setArchive] = useState(false);
  const data = [
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
    {title: 'Abroad Studies', date: '2 April 2022', time: '10:30'},
  ];
  const fetchUpcomming = () => {
    setUpComming(true);
    setArchive(false);
  };
  const fetchArchive = () => {
    setUpComming(false);
    setArchive(true);
  };
  const separator = () => {
    return <View style={{height: hp('2%')}} />;
  };
  const renderItem = ({item}) => {
    return (
      <MyAppointmentCard title={item.title} date={item.date} time={item.time} />
    );
  };
  return (
    <View style={{flex:1,backgroundColor: 'white'}}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.Gray44}
        barStyle="light-content"
      />
      <HeaderComponent
        Drawer={true}
        title={t('common:My_Appointment')}
        navigation={props.navigation}
      />
      <SwitchButton
        defaultSelected={upComming}
        swicthSelected={archive}
        toggleSwitch={() => fetchUpcomming()}
        switchToggle={() => fetchArchive()}
        defaultSelectedText={t('common:Upcomming')}
        swicthSelectedText={t('common:Archive')}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        key={index => index}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={separator}
      />
    </View>
  );
};

export default MyAppointments;
