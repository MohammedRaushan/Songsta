import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get } from "firebase/database"

export default function LibraryHome({navigation}) {
  // let auth = getAuth()
  let [playlist, setPlaylist]=useState([])
  let [keys, setKeys]=useState([])

  function loadPlaylist(){
    let db = getDatabase()
    // let playlistsRef = ref(db,`users/${auth.currentUser.uid}/playlists`)
    let playlistsRef = ref(db,`users/HT195NTHyMQXVDa5zqkAhJ9lGpz1/playlists`)
    get(playlistsRef)
    .then((res)=>{
      if(res!=null){
        let a1=[]
        let a2=[]
        res.forEach((snapshot)=>{
          a1.push(snapshot.key);
          a2.push(snapshot.val());
        })
        setKeys(a1)
        setPlaylist(a2)
      }
    })
    .catch((err)=>{
      Alert.alert("Error",err.message)
    })
  }
  useEffect(()=>{
    // let arr = JSON.stringify(playlist)
    console.log(keys);
    console.log(playlist);
    loadPlaylist()
  },[])
  return (
    <View className="flex-1 bg-slate-900 px-4 py-4">
      <View className="flex-row justify-between items-center">
      <Text className="text-white text-3xl font-bold ">PlayLists</Text>
      <View className="flex-row space-x-2">
      <TouchableOpacity onPress={loadPlaylist}>
        <Icon name='refresh-circle' size={30} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name='plus-box' size={30} color={"white"} />
      </TouchableOpacity>
      </View>
      </View>
      <ScrollView className="mt-6 space-y-4">
        {playlist.map((x,i)=>{
          return <TouchableOpacity onPress={()=>{navigation.navigate("Playlist",{x,pname:keys[i]})}} className="flex-row space-x-4" key={i}>
          <Image source={{
            uri:x.image
          }}
          className="w-16 h-16 rounded-xl" />
          <View>
            <Text className="text-white text-2xl">{keys[i]}</Text>
            <Text className="text-white text-lg">{x.songs.length} songs</Text>
          </View>
        </TouchableOpacity>
        })}
      </ScrollView>
      
    </View>
  )
}