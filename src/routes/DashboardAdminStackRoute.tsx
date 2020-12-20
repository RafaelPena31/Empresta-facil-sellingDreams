import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeAdmin from '../screens/dashboardAdmin/HomeAdmin'
import ProfileAdmin from '../screens/dashboardAdmin/ProfileAdmin'
import SolicitationAdmin from '../screens/dashboardAdmin/SolicitationAdmin'

export default function DashboardStackRouteAdmin() {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={HomeAdmin} />
      <Screen name='Profile' component={ProfileAdmin} />
      <Screen name='Solicitation' component={SolicitationAdmin} />
    </Navigator>
  )
}
