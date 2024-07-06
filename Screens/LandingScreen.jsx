import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function LandingScreen({navigation}) {
  return (
    <View className="flex-1 bg-slate-900 justify-center items-center px-12 overflow-hidden">
        <View className="flex-1 justify-center items-center space-y-2">
            <Image source={require("../assets/banner.png")} className="w-80 h-80 rounded-xl" />
            <Text className="text-white text-2xl font-bold">WELCOME TO SONGSTA</Text>
            <Text className="text-white text-center" >With Songsta, You'll will never miss a beat. Listen to your favourite songs on the go</Text>
        </View>
        <View className="w-full mb-4 space-y-4">
            <TouchableOpacity className="bg-sky-400 rounded-full p-2" onPress={()=>{navigation.navigate("Signup")}}>
                <Text className="text-xl text-center font-bold">Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.navigate("Login")}} className="border-[1px] border-sky-400 rounded-full p-2">
                <Text className="text-xl text-center text-sky-400 font-bold">Log in</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}