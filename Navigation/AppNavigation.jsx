import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { Home, Register, Login } from '../Screens/Home'
import { Home, Login, Register } from '../Screens'
import BottomTabs from './BottomTabs'
import AddSong from '../Screens/AddSong'
import PlaylistDetails from '../Screens/PlaylistDetails'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Register' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AddSong" component={AddSong} />
            <Stack.Screen name="PlaylistDetails" component={PlaylistDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation