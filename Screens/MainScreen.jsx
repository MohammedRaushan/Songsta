import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Components/Home'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Search from './Components/Search'
import Library from './Library'
import Player from './Player'
import 'react-native-gesture-handler'


export default function MainScreen() {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions={{tabBarStyle:{height:60, backgroundColor:"#0F172A", paddingBottom:5}}} >
        <Tab.Screen name='Home' component={Home} options={{headerShown:false,tabBarActiveTintColor:"white",
        tabBarIcon:({color})=>{return <Icon name='home' size={26} color={color} />}
        }} />
        <Tab.Screen name='Player' component={Player} options={{headerShown:false,tabBarActiveTintColor:"white",
        tabBarIcon:({color})=>{return <MCIcon name='motion-play' size={30} color={color} />}
        }} />
        <Tab.Screen name='Search' component={Search} options={{headerShown:false,tabBarActiveTintColor:"white",
        tabBarIcon:({color})=>{return <Icon name='search' size={26} color={color} />}
        }} />
        <Tab.Screen name='Library' component={Library} options={{headerShown:false,tabBarActiveTintColor:"white",
        tabBarIcon:({color})=>{return <MIcon name='my-library-music' size={26} color={color} />}
        }} />
    </Tab.Navigator>
  )
}