import { View, Text, ActivityIndicator, FlatList, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useCreatePlaylistMutation, useGetUserPlaylistsQuery } from '../redux/playlistApi'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Playlists = () => {

  const [input, setInput] = useState("")

  const navigation = useNavigation()

  const user = useSelector(state => state.auth.user)

  const { data: userPlaylists, isLoading, isSuccess, isError, error } = useGetUserPlaylistsQuery(user?._id)

  const [createPlaylist, { data: playlistData, isLoading: loadingPlaylist, isSuccess: playlistSuccess, isError: playlistError, error: playError }] = useCreatePlaylistMutation()

  console.log("USER PLAYLISTS: ", userPlaylists)

  let content;

  if(isLoading){
    content = <ActivityIndicator size="large" color="blue" />
  }else if(isSuccess){
    content = <FlatList 
      data={userPlaylists}
      renderItem={({ item })=> {
        return (
          <Pressable key={item._id} className="bg-white p-2 my-1 self-center w-full rounded-md" onPress={()=> navigation.navigate("PlaylistDetails", { item })}>
                <View>
                  <Text className="text-xl">{item.title}</Text>
                  <Text className="text-gray-500">Songs: {item.songs.length}</Text>
                </View>
              </Pressable>
        )
        
      }}
    />
  }

  const addHandler = (input) => {

    const formData = {title: input}

    createPlaylist(formData)

    setInput("")

  }

  return (
    <View className="flex-1 bg-gray-200">
      <View className="pt-14 mx-4">
        <Text className="text-2xl">Playlists</Text>

        <View className="mt-6">
          <TextInput 
          className="bg-white w-full mb-1 p-2 rounded-md text-xl"
            placeholder="New Playlist Title"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity className="bg-blue-600 p-2 rounded-md items-center mb-3" onPress={()=> addHandler(input)}>
            <Text className="text-white text-xl">Add</Text>
          </TouchableOpacity>
        </View>

        <View>
          {content}

        </View>
      </View>
    </View>
  )
}

export default Playlists