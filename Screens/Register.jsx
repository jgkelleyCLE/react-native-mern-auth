import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useRegisterUserMutation } from '../redux/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'

const Register = () => {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [registerUser, { data: registerData, isLoading, isSuccess, isError, error }] = useRegisterUserMutation()

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isFocused = useIsFocused()

    const submitHandler = () => {
        console.log(name, email, password)

        if(name && email && password){

            const formData = {
                name,
                email,
                password
            }

            registerUser(formData)
        }else if(isError){
            console.log(error)
        }

    }

    useEffect(()=> {

        if(isError){
            console.log("ERROR FROM LOGIN: ", error?.data?.message)
        }

    }, [isError])

    useEffect(()=> {

        if(isSuccess){
            dispatch(setUser(registerData))
            // Alert.alert("Registered successfully")
            navigation.navigate("Home")
        }

    }, [isSuccess])


    useEffect(()=> {

        user ? navigation.navigate("Home") : null

    }, [isFocused])


  return (
    <View className="flex-1 bg-gray-200">
        <View className="pt-14 mx-4">
            <Text className="text-2xl self-center">Register</Text>

        </View>

        <View className="mt-8">
            <TextInput 
                className="bg-white p-2 text-xl self-center w-11/12 rounded-md my-1"
                placeholder="Username"
                value={name}
                onChangeText={setName}
            />
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
            <TouchableOpacity className="bg-blue-700 w-11/12 self-center rounded-md my-1 p-2 items-center" onPress={submitHandler}>
                <Text className="text-white text-xl">Register</Text>
            </TouchableOpacity>

            <Pressable className="self-center mt-8" onPress={()=> navigation.navigate("Login")}>
                <Text>Already have an account? Sign in</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Register