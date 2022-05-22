import React,{useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import * as Colors from '../constants/colors';
import * as Typography from '../constants/typography';
import RBSheet from 'react-native-raw-bottom-sheet';

const ModalListView = (props, isVisible, onPress) => {
  const refRBSheet = useRef();
  useEffect(() => {
    if (isVisible) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }})
  return (
    <RBSheet
       ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        animationType={'slide'}
        customStyles={{
          container: {
            height: '60%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}}>
      <View style={styles.modalView}>
        <View style={styles.modalTop}>
        
          <Text style={props?.normalTitle ? styles.normalTitle : styles.title}>
            {props.title}
          </Text>
          <TouchableOpacity
            style={styles.cancelTouch}
            onPress={() => props.changeVisibility()}
           >
            <FastImage
              source={require('../assets/cross.png')}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props.data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return props.renderItem(item);
          }}
        />
      </View>
    </RBSheet>
  );
};
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.White,
    width: wp('100%'),
    height: hp('100%'),
    paddingHorizontal:15,
    paddingTop: hp('3%'),
    justifyContent: 'center',
  },
  cancelIcon: {
    width: wp('4%'),
    height: wp('4%'),
  },
  cancelTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('4%'),
    width: wp("8%"),
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    marginBottom:8 
  },
  title: {
    color: Colors.Black,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily:"OpenSans-Bold",
    lineHeight:24,
    
  },
  normalTitle: {
    color: Colors.Black,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily:"OpenSans-Bold",
    lineHeight:24,
    padding: 10,
  },
});
export default ModalListView;
