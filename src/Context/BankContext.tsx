import React, { useState } from 'react'

export interface BankContextProps {
  banco?: string
  agencia?: number
  conta?: string
}

export const BankContext = React.createContext<{
  bankValue: BankContextProps
  setBankValue: (addressValue: BankContextProps) => void
}>({
  bankValue: {},
  setBankValue: () => null
})

export default function BankContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [bankValue, setBankValue] = useState<BankContextProps>({})

  return (
    <BankContext.Provider
      value={{
        bankValue,
        setBankValue
      }}>
      {children}
    </BankContext.Provider>
  )
}
