import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { useGetAllSongsQuery } from '../redux/songApi'
import AddToPlaylistModal from '../Components/AddToPlaylistModal'
import { useNavigation } from '@react-navigation/native'

const Songs = () => {

    const navigation = useNavigation()

    const [open, setOpen] = useState(false)

    const { data: songs, isLoading, isSuccess, isError, error } = useGetAllSongsQuery()

    console.log("SONGS: ", songs)

    let content;

    if(isLoading){
        content = <ActivityIndicator size="large" color="blue" />
    }else if(isSuccess){
        content = <FlatList 
            data={songs}
            renderItem={({ item })=> {
                return (
                    <View className="bg-white rounded-md flex-row items-center justify-between p-4 my-1 self-center w-full">
                        <View className="items-start py-2">
                            <Text className="text-xl font-semibold">{item.title}</Text>
                            <Text className="italic text-gray-500">{item.artist}</Text>
                        </View>
                        <View className="items-end gap-2">
                            <Text>{item.album}</Text>
                            <TouchableOpacity className="bg-red-500 rounded-md p-1 items-center w-28" onPress={()=> navigation.navigate("AddSong", { ...item })}>
                                <Text>Add to playlist</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <AddToPlaylistModal open={open} setOpen={setOpen} item={item} /> */}

                    </View>
                )
            }}
            keyExtractor={(item)=> item._id}
        />
    }

  return (
    <View className="bg-gray-200 flex-1">
        <View className="pt-14 mx-4">
        <Text className="text-2xl">Songs</Text>
            {content}
        </View>

        
    </View>
  )
}

export default Songs