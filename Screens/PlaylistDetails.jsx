import { View, Text } from 'react-native'
import React from 'react'
import { useGetPlaylistQuery } from '../redux/playlistApi'

const PlaylistDetails = ({ route }) => {

    const id = route.params.item._id

    const { data: playlist, isLoading, isSuccess, isError, error } = useGetPlaylistQuery(id)

    const list = playlist?.songs?.map((item, index) => {
        return (
            <View key={index} className="bg-white p-2 my-1 self-center w-full rounded-md">
                <Text>{item}</Text>
            </View>
        )
        
    })    

  return (
    <View className="bg-gray-200 flex-1">
        <View className="pt-14 mx-4">
            <Text className="text-2xl">{playlist?.title}</Text>
            {list}
            
        </View>
    </View>
  )
}

export default PlaylistDetails