import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function SongCard({name, image, author, isFavourite}) {
  return (
    <View className="flex flex-row justify-between items-center my-2">
        <View className="flex flex-row space-x-4">
            <Image source={{
                uri:image
            }}
            className="w-16 h-16 rounded-xl" />
            <View className="flex-col justify-evenly">
                <Text className="text-white font-bold">{name}</Text>
                <Text className="text-slate-400">{author}</Text>
            </View>
        </View>
        <View>
            <TouchableOpacity>
                {isFavourite?<Icon name='cards-heart' size={30} color={"#037bfc"} />:<Icon name='cards-heart-outline' size={30} color={"white"} />}
            </TouchableOpacity>
        </View>
    </View>
  )
}