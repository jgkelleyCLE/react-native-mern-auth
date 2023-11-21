import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useLoginUserMutation } from '../redux/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'

const Login = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isFocused = useIsFocused()

    const [loginUser, { data: loginData, isLoading, isError, isSuccess, error }] = useLoginUserMutation()

    const loginHandler = () => {
        if(email && password){
            const formData = {
                email,
                password
            }
            loginUser(formData)
        }
    }

    useEffect(()=> {

        user ? navigation.navigate("Home") : null

    }, [])

    useEffect(()=> {

        if(isError){
            console.log("ERROR: ", error)
        }

    }, [isError])

    useEffect(()=> {

        if(isSuccess){
            dispatch(setUser(loginData))
            navigation.navigate("Home")
        }

    }, [isSuccess])

  return (
    <View className="flex-1 bg-gray-200 ">
        <View className="pt-14 mx-4">
            <Text className="text-2xl self-center mb-8">Login</Text>

            <TextInput 
                className="bg-white p-2 text-xl self-center w-11/12 rounded-md my-1"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                className="bg-white p-2 text-xl self-center w-11/12 rounded-md my-1"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

                <TouchableOpacity className="bg-green-700 w-11/12 self-center rounded-md my-1 p-2 items-center" onPress={loginHandler}>
                <Text className="text-white text-xl">Login</Text>
            </TouchableOpacity>

            <Pressable className="self-center mt-8" onPress={()=> navigation.navigate("Register")}>
                <Text>Don't have an account? Register.</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Login