import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Onboarding from '../screens/getStarted/onboarding';
import Home from '../screens/home/Home';
import BookAppointment from '../screens/appointments/BookAppointment';
import MyAppointments from '../screens/appointments/MyAppointments';
import NextBookAppointments from '../screens/appointments/NextBookAppointments';
import OTPVerification from '../screens/OTPVerification';
import SplashScreen from './SplashScreen';
import '../constants/DCSLocalize';
import AppointmentsConfirmation from '../screens/AppointmentsConfirmation';
import TermCondition from '../screens/TermCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ChangeLanguage from '../screens/ChangeLanguage';
import ChangeNumber from '../screens/ChangeNumber';
import AboutUs from '../screens/AboutUs';
import FastImage from 'react-native-fast-image';

import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';
import CustomDrawer from '../components/CustomDrawer';
import {Provider} from 'react-redux';
import store from '../store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: hp('-2%'),
          fontSize: Typography.FONT_SIZE_16,
          color: Colors.light_gray2,
        },
      }}>
      <Drawer.Screen
        name="Mostagbalik"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/home.png')}
              tintColor={Colors.light_gray2}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="My Appointments"
        component={MyAppointments}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/calendar.png')}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Change Number"
        component={ChangeNumber}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={{width: wp('4%'), height: hp('4%')}}
              resizeMode={'contain'}
              source={require('../assets/mobile.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/about_us.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermCondition}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/term_condition.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/privacy.png')}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Change Language"
        component={ChangeLanguage}
        
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FastImage
              style={styles.icon}
              resizeMode={'contain'}
              source={require('../assets/calendar.png')}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const Navigations = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Drawer"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookAppointment"
          component={BookAppointment}
          options={{
            headerShown: false,
            title: 'Book Appointment',
          }}
        />
        <Stack.Screen
          name="MyAppointment"
          component={MyAppointments}
          options={{
            headerShown: false,
            gestureEnabled: false,
            title: 'My Appointment',
          }}
        />
        <Stack.Screen
          name="NextAppointment"
          component={NextBookAppointments}
          options={{
            headerShown: false,
            title: 'Book Appointment',
          }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerShown: false,
            title: null,
          }}
        />
        <Stack.Screen
          name="AppointmentsConfirmation"
          component={AppointmentsConfirmation}
          options={{
            headerShown: false,
            title: 'Appointment Confirmation',
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: wp('5%'),
    height: hp('5%'),
  },
});

export default Navigations;
