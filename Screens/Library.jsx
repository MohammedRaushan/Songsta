import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LibraryHome from './Components/LibraryHome'
import Playlists from './Components/Playlists'
import 'react-native-gesture-handler'

export default function Library() {
    const Stack = createNativeStackNavigator()
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='LibraryHome' component={LibraryHome} options={{ headerShown: false }} />
                <Stack.Screen name='Playlist' component={Playlists} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </>
    )
}