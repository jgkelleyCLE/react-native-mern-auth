import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home'
import Songs from '../Screens/Songs'
import Playlists from '../Screens/Playlists'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
            tabBarIcon: ({ focused, color }) => {
                return <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={30} color={color} />
            }
        }}
        />

        <Tab.Screen 
        name="Songs" 
        component={Songs} 
        options={{
            tabBarIcon: ({ focused, color }) => {
               return <Ionicons name={focused ? "musical-notes" : "musical-notes-outline"} size={30} color={color} />
            }
        }}
        />

        <Tab.Screen 
        name="Playlist" 
        component={Playlists} 
        options={{
            tabBarIcon: ({ focused, color }) => {
                return <MaterialCommunityIcons name={focused ? "playlist-music" : "playlist-music-outline"} size={30} color={color} />
            }
        }}
        />

    </Tab.Navigator>
  )
}

export default BottomTabs