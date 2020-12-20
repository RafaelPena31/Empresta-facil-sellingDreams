import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import AddressContextProvider from './context/AddressContext'
import BankContextProvider from './context/BankContext'
import LoanContextProvider from './context/LoanContext'
import ProductsContextProvider from './context/ProductsContext'
import ProductsAdminContextProvider from './context/ProductsContextAdmin'
import UserContextProvider from './context/UserContext'
import AproveCreditModal from './modals/AproveCreditModal'
import Routes from './routes/StackRoute'

const App = () => {
  const [visible, setVisible] = useState(false)

  return (
    <NavigationContainer>
      <UserContextProvider>
        <AddressContextProvider>
          <ProductsContextProvider>
            <ProductsContextProvider>
              <ProductsAdminContextProvider>
                <LoanContextProvider>
                  <BankContextProvider>
                    <StatusBar barStyle='dark-content' />
                    <AproveCreditModal visible={visible} setVisible={setVisible} />
                    <Routes />
                  </BankContextProvider>
                </LoanContextProvider>
              </ProductsAdminContextProvider>
            </ProductsContextProvider>
          </ProductsContextProvider>
        </AddressContextProvider>
      </UserContextProvider>
    </NavigationContainer>
  )
}
export default App
