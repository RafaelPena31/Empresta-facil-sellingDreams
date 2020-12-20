import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Chatbot from '../screens/chatbot/Chatbot'
import ChatbotOtherData from '../screens/chatbot/ChatbotOtherData'
import Activity from '../screens/dashboard/Activity'
import Home from '../screens/dashboard/Home'
import Profile from '../screens/dashboard/Profile'
import Solicitation from '../screens/dashboard/Solicitation'

export default function DashboardStackRoute() {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={Home} />
      <Screen name='Profile' component={Profile} />
      <Screen name='Solicitation' component={Solicitation} />
      <Screen name='Activity' component={Activity} />
      <Screen name='Chatbot' component={Chatbot} />
      <Screen name='ChatbotOtherData' component={ChatbotOtherData} />
    </Navigator>
  )
}
