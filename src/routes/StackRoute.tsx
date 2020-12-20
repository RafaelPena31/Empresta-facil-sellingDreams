import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { AddressContext, AddressContextProps } from '../context/AddressContext'
import { BankContext, BankContextProps } from '../context/BankContext'
import { ProductsContext } from '../context/ProductsContext'
import { ProductsAdminContext } from '../context/ProductsContextAdmin'
import { UserContext, UserContextProps } from '../context/UserContext'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import Chatbot from '../screens/chatbot/Chatbot'
import ChatbotOtherData from '../screens/chatbot/ChatbotOtherData'
import Landing from '../screens/Landing'
import LoadScreen from '../screens/Load'
import AddressRegister from '../screens/register/AddressRegister'
import DocumentRegister from '../screens/register/DocumentRegister'
import UserRegister from '../screens/register/UserRegister'
import { ProductItemAdminProp, ProductItemProp } from '../types/ProductItem'
import DashboardStackRouteAdmin from './DashboardAdminStackRoute'
import DashboardStackRoute from './DashboardStackRoute'

export default function Routes() {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null)
  const { setUserValue } = useContext(UserContext)
  const { setBankValue } = useContext(BankContext)
  const { setAddressValue } = useContext(AddressContext)
  const { setProductsValue } = useContext(ProductsContext)
  const { setProductsValueAdmin } = useContext(ProductsAdminContext)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  auth().onAuthStateChanged(user => {
    setCurrentUser(user)
  })

  useEffect(() => {
    setIsLoading(true)

    if (currentUser !== null) {
      firestore()
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          const arrayCollection = doc.data()
          if (arrayCollection !== undefined) {
            const UserDataTotal: UserContextProps = arrayCollection.profile
            const BankDataTotal: BankContextProps = arrayCollection.bank
            const AddressDataTotal: AddressContextProps = arrayCollection.address
            const isAdminData: boolean = arrayCollection.isAdmin
            setUserValue({ ...UserDataTotal, id: currentUser.uid })
            setBankValue(BankDataTotal)
            setAddressValue(AddressDataTotal)
            setIsAdmin(isAdminData)
          }
        })

      firestore()
        .collection('general_products')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          const arrayCollection = doc.data()
          if (arrayCollection !== undefined) {
            const ProdDataTotal: ProductItemAdminProp[] = arrayCollection.products
            setProductsValueAdmin(ProdDataTotal)
          }
        })

      firestore()
        .collection('products')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          const arrayCollection = doc.data()
          if (arrayCollection !== undefined) {
            const ProdDataTotal: ProductItemProp[] = arrayCollection.products
            setProductsValue(ProdDataTotal)
          }
        })
    }
    setIsLoading(false)
  }, [currentUser, isAdmin, setAddressValue, setBankValue, setProductsValue, setProductsValueAdmin, setUserValue])

  const { Navigator, Screen } = createStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <Screen name='Load' component={LoadScreen} />
      ) : (
        <>
          {currentUser !== undefined && currentUser !== null ? (
            <>
              <Screen name='Home' component={isAdmin ? DashboardStackRouteAdmin : DashboardStackRoute} />
            </>
          ) : (
            <>
              <Screen name='Landing' component={Landing} />
              <Screen name='Chatbot' component={Chatbot} />
              <Screen name='ChatbotOtherData' component={ChatbotOtherData} />
              <Screen name='Login' component={Login} />
              <Screen name='Register' component={Register} />
              <Screen name='AddressRegister' component={AddressRegister} />
              <Screen name='DocumentRegister' component={DocumentRegister} />
              <Screen name='UserRegister' component={UserRegister} />
            </>
          )}
        </>
      )}
    </Navigator>
  )
}
