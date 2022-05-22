import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Typography from '../../../constants/typography';
import * as Colors from '../../../constants/colors';

const Card = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    shadowColor: Colors.Black,
    borderRadius: 15,
    marginHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 2,
    marginVertical: 15,
    padding: 15,
  },
  title: {
    alignSelf: 'center',
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Black,
    lineHeight: 24,
    marginBottom: 5,
    color: Colors.Black,
  },
  description: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: 'OpenSans-Regular',
    alignSelf: 'center',
    color: Colors.Gray44,
    textAlign: 'center',
    lineHeight: 24,
  },
});
