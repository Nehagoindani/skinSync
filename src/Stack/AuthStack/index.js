import { createStackNavigator } from '@react-navigation/stack';
import Start from '../../Screens/AuthScreens/Start';
import Login from '../../Screens/AuthScreens/Login';
import SignUp from '../../Screens/AuthScreens/SignUp';
import ForgotPassword from '../../Screens/AuthScreens/forgotPass';
import ResetPass from '../../Screens/AuthScreens/resetPass';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="forgotPass" component={ForgotPassword} />
      <Stack.Screen name="resetPass" component={ResetPass} />

    </Stack.Navigator>
  );
};

export default AuthStack;

