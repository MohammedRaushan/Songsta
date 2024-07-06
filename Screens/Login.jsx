import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons.js'
import app from "./Components/Config.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login({navigation}) {
    let [email,setEmail] = useState()
    let [password, setPassword] = useState()
    const auth = getAuth(app)
    async function login(){
        if(email!=undefined && password!=undefined){
            if(email.includes("@")){
                signInWithEmailAndPassword(auth,email, password)
                .then((res)=>{
                    navigation.navigate("MainScreen")
                    // Alert.alert("Success","Working properly")
                })
                .catch((err)=>{
                    Alert.alert("Invalid credentials","Your email address/password is incorrect")
                })
            }
            else{
                Alert.alert("Invalid Email", "You entered an invalid email address")
            }
        }
        else{
            Alert.alert("Empty credentials","Fill all the details")
        }
    }
    return (
        <View className="flex-1 bg-slate-900 px-8 py-10">
            <TouchableOpacity onPress={()=>{navigation.goBack()}} className="absolute top-5 left-4">
                <Icon name="arrow-left-drop-circle-outline" size={40} color="white" />
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center space-y-6">
                <View className=" self-start w-80">
                    <Text className="text-3xl text-white font-bold">Login</Text>
                    <Text className="text-lg text-slate-400">Please login to continue</Text>
                </View>
                <View className="bg-slate-900  rounded-xl w-80 space-y-4">
                    <View className="focus:border-2 border-white/50 rounded-xl flex flex-row space-x-2 pl-4 py-2 ">
                        <View className=""><Icon name='account-tie' size={30} color={"white"} /></View>
                        <TextInput textContentType='emailAddress' onChangeText={(e)=>{setEmail(e)}} placeholder='Email address' placeholderTextColor={"white"} className="text-xl text-white rounded-full" />
                    </View>
                    <View className="focus:border-2 border-white/50 rounded-xl flex flex-row space-x-2 pl-4 py-2 ">
                        <View className=""><Icon name='shield-lock' size={30} color={"white"} /></View>
                        <TextInput secureTextEntry onChangeText={(e)=>{setPassword(e)}} placeholder='Password' placeholderTextColor={"white"} className="text-xl text-white  rounded-full" />
                    </View>
                    <TouchableOpacity onPress={login} className="bg-sky-500 p-2 rounded-lg self-end px-6">
                        <Text className="text-white font-bold text-lg text-center">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}