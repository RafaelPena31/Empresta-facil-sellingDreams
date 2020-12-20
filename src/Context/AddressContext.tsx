import React, { useState } from 'react'

export interface AddressContextProps {
  cep?: string
  uf?: string
  cidade?: string
  bairro?: string
  logradouro?: string
  numero?: string
  complemento?: string
}

export const AddressContext = React.createContext<{
  addressValue: AddressContextProps
  setAddressValue: (addressValue: AddressContextProps) => void
}>({
  addressValue: {},
  setAddressValue: () => null
})

export default function AddressContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [addressValue, setAddressValue] = useState<AddressContextProps>({})

  return (
    <AddressContext.Provider
      value={{
        addressValue,
        setAddressValue
      }}>
      {children}
    </AddressContext.Provider>
  )
}
