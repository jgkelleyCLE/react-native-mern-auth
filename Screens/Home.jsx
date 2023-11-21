import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logoutUser, setUser } from '../redux/authSlice'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {

  const navigation = useNavigation()

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  

  useEffect(()=> {

    if(!user){
      navigation.navigate("Login")
    }

    const fetchUser = async() => {
      try {
        
        const userData = await AsyncStorage.getItem('goalUser')
        console.log("USER DATA: ", userData)
        if(userData){
          dispatch(setUser(JSON.parse(userData)))
          
        }else if(!userData){
          navigation.navigate("Login")
        }

      } catch (error) {
        console.log("ERROR FETCHING USER DATA: ", error)
      }
    }
    
    fetchUser()

  }, [isFocused])


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