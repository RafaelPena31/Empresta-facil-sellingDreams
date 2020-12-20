import React, { useState } from 'react'

export interface UserContextProps {
  dtAniversario?: string
  nome?: string
  cpf?: string
  sexo?: string
  telefone?: string
  estadoCivil?: string
  nomeMae?: string
  numeroRG?: string
  orgaoRG?: string
  ufEmissaoRG?: string
  dtEmissaoRG?: string
  id?: string
}

export const UserContext = React.createContext<{
  userValue: UserContextProps
  setUserValue: (userValue: UserContextProps) => void
}>({
  userValue: {},
  setUserValue: () => null
})

export default function UserContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [userValue, setUserValue] = useState<UserContextProps>({})

  return (
    <UserContext.Provider
      value={{
        userValue,
        setUserValue
      }}>
      {children}
    </UserContext.Provider>
  )
}
