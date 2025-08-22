import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext, AppProvider, useAppContext} from './src/Context/AppContext';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './src/Stack/AuthStack';
import HomeStack from './src/Stack/HomeStack';


export default function App() {
 
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const MainStack = createStackNavigator();
const AppContent = () => {
  const {token} = useAppContext(AppContext);
  // const context = useContext(AppContext);
  useEffect(() => {
    console.log(token, 'app');
  }, [token]);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        {token === null ? (
          <MainStack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <MainStack.Screen name="HomeStack" component={HomeStack} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
