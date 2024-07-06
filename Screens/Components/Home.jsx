import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import SongCard from './SongCard'
import { LogBox } from 'react-native'
import { getDatabase, ref, get } from "firebase/database"

export default function Home({ navigation }) {
  let filters = ["Trending", "Rock", "Pop", "Country", "Electronic"]
  let [filter, setFilter] = useState(filters[0])
  let [playlists, setPlaylists] = useState([])
  let [pname, setPname] = useState([])
  let [songs, setSongs] = useState([])
  let db = getDatabase()


  async function loadPlaylists() {
    let playlistsRef = ref(db, "users/HT195NTHyMQXVDa5zqkAhJ9lGpz1/playlists")
    let temp = await get(playlistsRef)
    setPlaylists(temp.val())
    setPname(Object.keys(playlists))
  }
  async function loadSongs() {
    let songsRef = ref(db, "songs")
    let temp = await get(songsRef)
    setSongs(temp.val());
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    loadSongs()
    loadPlaylists()
  }, [])
  function changeFilter(index) {
    setFilter(index)
  }
  return (
    <ScrollView className="flex-1 pt-6 bg-slate-900">
      <View className="flex flex-row justify-between items-center px-4">
        {/* Header View  */}
        <Text className="text-white text-xl">Welcome Back, Hana</Text>
        <View className="flex flex-row items-center space-x-2">
          <TouchableOpacity>
            <Icon name='settings-outline' size={25} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../assets/user-profile-bg.jpg")}
              className="w-7 h-7 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-4 pt-4" >
        <View className="flex-row justify-between items-center">
          <Text className="text-white py-4 text-xl">Favourite Playlists</Text>
          <TouchableOpacity onPress={loadPlaylists} className="rounded-full border-2 border-[#037bfc]">
            <Text className="text-white py-[4px] px-[8px]">refresh</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
        {pname.map((item, index)=>{
          return <TouchableOpacity key={index} className="mr-6" onPress={() => { navigation.navigate("Library", { screen: "Playlist", params: { x: playlists[item], pname: item } }) }}>
          <Image source={{
            uri: playlists[item].image
          }} className="w-48 h-48 rounded-xl" />
          <Text className="text-white text-xl">{item} </Text>
        </TouchableOpacity>
        })}
        </ScrollView>
      </View>
      <View className="mx-4 mt-10 mb-6" >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((name, index) =>
            <TouchableOpacity onPress={() => { changeFilter(name) }} key={index}>
              {filter == name ? <Text className="text-[#037bfc] py-2 px-4 text-center font-bold border-2 border-[#037bfc] rounded-full mr-2">{name}</Text> : <Text className="text-slate-200 font-bold p-2 border-2 border-sky-700/0 mr-2">{name}</Text>}
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <View className="mx-4 mb-8">
        {songs.map((item, index)=>{
          return <TouchableOpacity key={index} onPress={() => { navigation.navigate("Player", { item, songs }) }}>
          <SongCard name={item.name} image={item.image}
            author={item.author} isFavourite={item.isFavourite} />
        </TouchableOpacity>
        })}
      </View>
    </ScrollView>
  )
}