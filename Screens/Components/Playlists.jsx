import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Entypo"
import SongCard from './SongCard'
import { getAuth } from 'firebase/auth'

export default function Playlists({ route, navigation }) {
  let { songs, image } = route.params.x
  let name = route.params.pname
  let [item, setItem] = useState(songs[0])
  let auth = getAuth()
  function details(){
    console.log(auth.currentUser.uid);
  }
  return (
    <View className="flex-1 bg-slate-800 px-4 pt-4">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity onPress={()=>{navigation.navigate("LibraryHome")}}>
          <Icon name='chevron-left' size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={details}>
          <Icon name='dots-three-vertical' size={28} color={"white"} />
        </TouchableOpacity>
      </View>
      <ScrollView className="pt-16">
        <View className="justify-center items-center">
          <Image source={{
            uri: image
          }}
            className="w-64 h-64 rounded-xl"
          />
          <Text className="text-white text-3xl mt-4">{name}</Text>
          <Text className="text-white text-lg">{songs.length} Songs</Text>
          <TouchableOpacity className="bg-green-600 px-4 py-2 rounded-full mt-4 mb-2"
            onPress={() => { navigation.navigate("Player", { item, songs }) }}>
            <Text className="text-xl text-white font-bold">Play</Text>
          </TouchableOpacity>
        </View>
        <View>
          {songs.map((item, i) => {
            return <TouchableOpacity key={i} onPress={() => { navigation.navigate("Player", { item, songs }) }}>
              <SongCard author={item.author} name={item.name} isFavourite={item.isFavourite} image={item.image} />
            </TouchableOpacity>
          })}
        </View>
        <View className="p-10">
        </View>
      </ScrollView>

    </View>
  )
}