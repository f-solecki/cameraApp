import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from "./components/Main"
import Gallery from "./components/Gallery"
import BigPhoto from "./components/BigPhoto"
import CameraScreen from "./components/CameraScreen"


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Main" component={Main} options={{
          headerShown: false,

        }} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="BigPhoto" component={BigPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;