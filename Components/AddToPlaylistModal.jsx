import { View, Text, Modal } from 'react-native'
import React from 'react'

const AddToPlaylistModal = ({ open, setOpen, item }) => {

    console.log("ITEM: ", item)

  return (
    <Modal visible={open} onRequestClose={()=> setOpen(false)} animationType='slide' presentationStyle='pageSheet'>
        <Text>Modal</Text>
    </Modal>
  )
}

export default AddToPlaylistModal