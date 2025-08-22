import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {black, white} from '../Constants/index';
import Inicon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  return (
    <View style={{width: '100%', height: 30}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log('jskf');
          navigation.goBack();
        }}>
        <Inicon name="arrow-back" size={moderateScale(18)} color={white} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    zIndex: 1,
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(20, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: moderateScale(5),
    // height: moderateScale(65),
    marginLeft: moderateScale(-8, 0),
    marginTop: moderateScale(-10, 0.1),
   
  },
});
export default Header;