import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, Image, Modal, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "@expo/vector-icons/Ionicons"
import EIcon from "@expo/vector-icons/Entypo"
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons"
// import Slider from '@react-native-community/slider'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { LogBox } from 'react-native'

export default function Player({ route, navigation }) {
  LogBox.ignoreLogs(["Possible unhandled promise rejection"])
  let { name, image, isFavourite, uri, author } = route.params.item
  let songs = route.params.songs
  let [isPlaying, setIsPlaying] = useState(false)
  let [isLooping, setIsLooping] = useState(false)
  let [isFav, setIsFav] = useState(isFavourite)
  let [duration, setDuration] = useState(0)
  let [position, setPosition] = useState(0)
  let [queueIndex, setQueueIndex] = useState()
  let [modalVisible, setModalVisible] = useState(false)
  let [player, setPlayer] = useState(new Audio.Sound())

  async function loadSong(shouldPlay) {
    if (player != null) {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        staysActiveInBackground: true,
        playsInSilentModeIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        shouldDuckAndroid: true
      })

      player.unloadAsync()
        .then(async (res) => {
          let tempStatus = await player.loadAsync({ uri: uri }, { shouldPlay: shouldPlay }, false)
          console.log("Loading Song :");
          setIsPlaying(tempStatus.isPlaying)
          setDuration(tempStatus.durationMillis)
          player.setStatusAsync({ volume: 1 })
          player.setVolumeAsync(1)
          
        })
        .catch((err) => { console.log(); })

    }
  }
  useEffect(() => {
    loadSong(true)
    setTimeout(() => {
      getPosition()
    }, 2500)
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].name == name) {
        setQueueIndex(i)
        break
      }
    }
  }, [name])

  async function play() {
    console.log(queueIndex);
    setIsPlaying(true)
    await player.playAsync()
    // console.log(duration + " == " + position);
  }
  async function pause() {
    setIsPlaying(false)
    await player.pauseAsync()
  }
  function playNext() {
    let item = songs[queueIndex + 1]
    navigation.navigate("Player", { item, songs })
  }
  function playPrevious() {
    let item = songs[queueIndex - 1]
    navigation.navigate("Player", { item, songs })
  }
  function getPosition() {
    setTimeout(() => {
      player.getStatusAsync()
        .then((res) => {
          setPosition(res.positionMillis)
        })
    }, 1000)
  }


  useEffect(()=>{
      if(position>=duration){
        if(isLooping){
          loadSong(true)
        }
        else{
          queueIndex<songs.length-1?playNext():loadSong(false)
        }
      }
      setTimeout(()=>{
        getPosition()
      },0)
  },[position])

  // useEffect(() => {
  //   setInterval(async () => {
  //     if (duration == 0) {
  //       getDuration()
  //     }
  //     else {
  //       let status = await player.getStatusAsync()
  //       if (status.positionMillis == status.durationMillis) {
  //         setIsPlaying(false)
  //         if (isLooping) {
  //           loadSong(true)
  //         }
  //         else {
  //           queueIndex < songs.length - 1 ? playNext() : loadSong(false)
  //         }
  //       }
  //       else{
  //         console.log("Error in status");
  //       }
  //     }
  //   }, 1000);
  // }, [])

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ImageBackground
        source={{
          uri: image
        }}
        resizeMode='cover'
        className="flex-1 justify-center"
      >
        <View className="flex-1 flex-col items-between justify-between bg-black/50 pt-5">
          <View className="flex-row justify-between px-4">
            <Modal
              visible={false}
              animationType='slide'
              transparent={true}
              onRequestClose={() => { setModalVisible(false) }}
            >
              <View>
                <Text>Player Settings</Text>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => {navigation.goBack() }}>
                  <EIcon name='chevron-left' size={30} color={"white"} />
                </TouchableOpacity>
            <TouchableOpacity>
              <EIcon name='dots-three-vertical' size={25} color={"white"} />
            </TouchableOpacity>
          </View>
          <View className="self-center">
            <Image source={{
              uri: image
            }}
              className="w-72 h-72 rounded-xl" />
          </View>
          <View className="px-4 mb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-2xl font-bold">{name}</Text>
                <Text className="text-slate-300 text-lg">{author}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => { setIsFav(!isFav) }}>
                  {isFav ? <Icon name='heart' size={30} color={"#037bfc"} /> : <Icon name='heart-outline' size={30} color={"white"} />}
                </TouchableOpacity>
              </View>
            </View>
            <View className="py-6">
              {/* <ProgressBar /> */}
              <View className="flex-row justify-between px-2">
                <Text className="text-white">{parseInt("" + (position / 60000))}:{parseInt("" + ((position / 1000) % 60))}</Text>
                <Text className="text-white">{parseInt("" + (duration / 60000))}:{parseInt("" + ((duration / 1000) % 60))}</Text>
              </View>
              {/* <Slider
                style={{ width: 350 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor="lightblue"
                maximumTrackTintColor="#FFFFFF"
                lowerLimit={0}
                onValueChange={getPosition()}
              /> */}
            </View>
            <View className="flex-row justify-between items-center">
              <View>
                <TouchableOpacity onPress={() => { isLooping ? setIsLooping(false) : setIsLooping(true) }}>
                  {isLooping ? <MCIcon name='repeat-once' size={35} color={"white"} /> : <MCIcon name='repeat' size={35} color={"white"} />}
                </TouchableOpacity>

              </View>
              <View className="flex-row justify-between space-x-2 items-center">
                <TouchableOpacity onPress={playPrevious} disabled={queueIndex <= 0 ? true : false}>
                  <Icon name="play-skip-back" size={35} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { isPlaying ? pause() : play() }} className="bg-white rounded-full">
                  {isPlaying ? <Icon name='pause-circle' size={75} color={"#0076fc"} /> : <Icon name='play-circle' size={75} color={"#0076fc"} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={playNext} disabled={queueIndex < songs.length - 1 ? false : true} >
                  <Icon name="play-skip-forward" size={35} color={"white"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { setModalVisible(true) }} >
                <EIcon name='list' size={35} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType='slide'
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => { setModalVisible(false) }}
        >
          <View className="flex-1">
            <Pressable className="flex-[.2] bg-slate-900/50" onPress={() => { setModalVisible(false) }}>
            </Pressable>
            <View className="flex-[.8] bg-slate-900 rounded-[25px_25px_0px_0px] p-4">
              <View>
                <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                  <Icon name='chevron-down' size={30} color={"white"} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {songs.map((item, i) => {
                  return <TouchableOpacity key={i} className="m-2" onPress={() => { navigation.navigate("Player", { item, songs }) }}>
                    {queueIndex==i?<Text className="text-green-700 text-lg">{item.name}</Text>:<Text className="text-white text-lg">{item.name}</Text>}
                  </TouchableOpacity>
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  )
}