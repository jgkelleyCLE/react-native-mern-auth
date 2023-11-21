import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logoutUser } from '../redux/authSlice'
import { useIsFocused } from '@react-navigation/native'

const Home = () => {

  const navigation = useNavigation()

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  

  useEffect(()=> {

    if(!user){
      navigation.navigate("Login")
    }
    

  }, [user])

  const logoutHandler = () => {
    console.log("logging out")
    dispatch(logoutUser())
    navigation.navigate("Login")
  }

  return (
    <View className="flex-1 bg-gray-200">
      <View className="pt-14 mx-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl">Home</Text>
          <Text>Welcome, {user?.name}</Text>
          <TouchableOpacity className="bg-blue-600 p-2 rounded-md" onPress={logoutHandler}>
            <Text className="text-white text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  )
}

export default Home