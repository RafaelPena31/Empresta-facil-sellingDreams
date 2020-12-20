import React, { useState } from 'react'
import { ProductItemProp } from '../types/ProductItem'

export const ProductsContext = React.createContext<{
  productsValue: ProductItemProp[]
  setProductsValue: (loanValue: ProductItemProp[]) => void
}>({
  productsValue: [],
  setProductsValue: () => null
})

export default function ProductsContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [productsValue, setProductsValue] = useState<ProductItemProp[]>([])

  return (
    <ProductsContext.Provider
      value={{
        productsValue,
        setProductsValue
      }}>
      {children}
    </ProductsContext.Provider>
  )
}
