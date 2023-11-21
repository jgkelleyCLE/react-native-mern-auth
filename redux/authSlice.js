import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'
 
const user = AsyncStorage.getItem('goalUser').then((res)=> console.log("ASYNC USER:", res))

const initialState = {
    user: user ? user : null
    // user: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            AsyncStorage.setItem('goalUser', JSON.stringify(action.payload)).catch((error) => {
                console.log("error saving user data: ", error)
            })
        },
        logoutUser: (state, action) => {
            state.user = null
            AsyncStorage.removeItem('goalUser')
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer