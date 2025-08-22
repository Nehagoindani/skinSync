import {StyleSheet, Platform, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from 'react-native-size-matters';
import HomeScreen from '../../Screens/HomeScreens/Home';
import Wishlist from '../../Screens/HomeScreens/Wishlist';
import Profile from '../../Screens/HomeScreens/Profile';
import Menu from '../../Screens/HomeScreens/Products';
import CartScreen from '../../Screens/HomeScreens/Cart';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
          tabBarStyle: [
            {
              display: 'flex',
              backgroundColor: '#FF6B6B',
              borderTopWidth: 1,
              borderTopColor: '#595959',
              // elevation: 10,
              shadowColor: 'rgba(0, 0, 0, 5)',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              shadowRadius: 22,
              width: '100%',
              height:
                Platform.OS == 'ios'
                  ? moderateScale(90, 0.1)
                  : moderateScale(60, 0.1),
              elevation: 1,
            },
            null,
          ],

          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focus : null}>
                <Icon
                  name="home"
                  color="black"
                  style={{padding: 2}}
                  solid
                  size={moderateScale(25, 0.1)}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={'Menu'}
          component={Menu}
          options={{
            tabBarVisible: false,

            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focus : null}>
                <Icon
                  name="apps"
                  color="black"
                  style={{padding: 2, justifyContent: 'center'}}
                  solid
                  size={moderateScale(25, 0.1)}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Wishlist'}
          component={Wishlist}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focus : null}>
                <Icon
                  name="heart"
                  color="black"
                  style={{padding: 2}}
                  solid
                  size={moderateScale(28, 0.1)}
                />
              </View>
            ),
          }}
        />
         <Tab.Screen
          name={'Cart'}
          component={CartScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focus : null}>
                <Icon
                  name="cart"
                  color="black"
                  style={{padding: 2}}
                  solid
                  size={moderateScale(28, 0.1)}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focus : null}>
                <Icon
                  name="person-circle"
                  color="black"
                  solid
                  style={{padding: 2}}
                  size={moderateScale(28, 0.1)}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  addTab: {
    backgroundColor: '#FFD700',
    // padding: moderateScale(10, 0.1),
    width: moderateScale(50, 0.1),
    height: moderateScale(50, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(40, 0.1),
    borderRadius: moderateScale(25, 0.1),
  },
  focus: {
    backgroundColor: '#FFFFFF',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.1),
    shadowColor: 'rgba(0, 0, 0, 5)',
    width: moderateScale(40, 0.1),
    height: moderateScale(40, 0.1),
    // shadowOffset: {width: 50, height: 50},
    shadowOpacity: 1,
    shadowRadius: 29,
    borderRadius: moderateScale(40, 0.1),
  },
});
