import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Colors from '../constants/colors';

const Loader = ({visible, spinnerText}) => {
  return (
    <Spinner
      overlayColor={'rgba(0, 0, 0, 0.65)'}
      cancelable={false}
      visible={visible}
      textContent={spinnerText ? spinnerText : 'Synching data'}
      textStyle={styles.textStyle}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.White,
  },
});

export default Loader;
