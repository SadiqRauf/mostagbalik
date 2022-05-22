import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import * as Typography from '../../../constants/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import * as Colors from '../../../constants/colors';
import AboutModal from './aboutModal';

const Header = ({onPress}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {t, i18n} = useTranslation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          style={styles.img}
          source={require('../../../assets/rowsImg.png')}
        />
        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>{t('common:About_Mostagbalik')}</Text>
          <View style={styles.bottom} />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description} numberOfLines={5}>
          {t('common:Mostagbalik_SDescription')}
        </Text>
      </View>
      <TouchableOpacity style={styles.seeMore} onPress={toggleModal}>
        <Text style={styles.seeMoreText}>{t('common:Read_More')}</Text>
      </TouchableOpacity>
      {isModalVisible && (
        <AboutModal isVisible={isModalVisible} onPress={toggleModal} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: 'OpenSans-ExtraBold',
    color: Colors.Black,
    lineHeight: 33,
    textAlign: 'center',
    marginTop: '15%',
    // marginLeft: 10,
  },
  bottom: {
    borderBottomColor: Colors.San_Marino,
    borderBottomWidth: hp('0.2%'),
    width: wp('20%'),
    alignSelf: 'center',
    borderRadius: 3,
    marginVertical: 5,
  },
  descriptionContainer: {
    padding: 15,
  },
  description: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.description_gray,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 28,
    textAlign: 'justify',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  seeMore: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  seeMoreText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: 'OpenSans-Medium',
    lineHeight: 19,
    color: Colors.San_Marino,
  },
  img: {
    height: hp('7%'),
    width: wp('17%'),
  },
});
