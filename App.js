import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screens/Login/Login';
import Dashboard from './Screens/Home/Dashboard';

import ViewInquiryPage from './Screens/EnquiryDetails/EnquiryDetails';
import ExecutiveForm from './Screens/AddExecutive/ExecutiveForm';
import ViewExecutiveScreen from './Screens/ViewExecutiveScreen/ViewExecutiveScreen';
import EnquiryDetails from './Screens/EnquiryDetails/EnquiryDetails';
import ReportsScreen from './Screens/Report/Report';
import ProfilePage from './Screens/Profile/Profile';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExecutiveForm" component={ExecutiveForm} />
          <Stack.Screen name="ViewExecutiveScreen" component={ViewExecutiveScreen} />
          <Stack.Screen name="EnquiryDetails" component={EnquiryDetails} />
          <Stack.Screen name="Report" component={ReportsScreen} />
          <Stack.Screen name="ViewInquiryPage" component={ViewInquiryPage} />
          {/* <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
