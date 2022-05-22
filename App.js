import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Navigations from './src/navigation/Navigations';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './src/constants/DCSLocalize';
import store from './src/store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Colors from './src/constants/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.light_blue} barStyle="dark-content" />

      <View style={{flex: 1, marginTop: 30, backgroundColor: 'white'}}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </Provider>

        {/* <BookAppointment /> */}
      </View>
    </SafeAreaProvider>
  );
};

export default App;
