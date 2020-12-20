import React, { useState } from 'react'
import { ProductItemAdminProp } from '../types/ProductItem'

export const ProductsAdminContext = React.createContext<{
  productsValueAdmin: ProductItemAdminProp[]
  setProductsValueAdmin: (loanValue: ProductItemAdminProp[]) => void
}>({
  productsValueAdmin: [],
  setProductsValueAdmin: () => null
})

export default function ProductsAdminContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [productsValueAdmin, setProductsValueAdmin] = useState<ProductItemAdminProp[]>([])

  return (
    <ProductsAdminContext.Provider
      value={{
        productsValueAdmin,
        setProductsValueAdmin
      }}>
      {children}
    </ProductsAdminContext.Provider>
  )
}
