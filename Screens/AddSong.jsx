import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useAddSongMutation, useGetUserPlaylistsQuery } from '../redux/playlistApi'
import { useSelector } from 'react-redux'

const AddSong = ({ route }) => {

    console.log(route.params)
    const user = useSelector(state => state.auth.user)

    const song = route.params
    console.log("SONG ID: ", song._id)

    const { data: playlists, isLoading, isSuccess } = useGetUserPlaylistsQuery()

    const [addSong, { data: songData, isSuccess: songSuccess, isLoading: songLoading, isError, error }] = useAddSongMutation()

    console.log("USER ID: ", user._id)

    console.log("PLAYLISTS: ", playlists)

    

    const addHandler = (item) => {
      console.log("add handler ITEM: ", item)

      addSong({playlistId: item._id, songId: song._id})
      console.log("ADDING..........")
    }

  return (
    <View className="bg-gray-200 flex-1">
        <View className="pt-14 mx-4">
      <Text className="text-2xl">{song?.title}</Text>
      <Text className="text-lg text-gray-600">{song?.artist}</Text>
      <Text className="text-lg text-gray-600">Song ID: {song?._id}</Text>

        </View>
        <View className="mx-4">
          <Text className="self-center text-xl">Add to playlist</Text>
          <ScrollView >
          {
            playlists?.map(item => (
              
              <Pressable key={item._id} className="bg-white p-2 my-1 self-center w-full rounded-md" onPress={()=> addHandler(item)}>
                <View>
                  <Text className="text-xl">{item.title}</Text>
                  <Text className="text-gray-500">Songs: {item.songs.length}</Text>
                </View>
              </Pressable>
            ))
          }
          </ScrollView>
        </View>
    </View>
  )
}

export default AddSong