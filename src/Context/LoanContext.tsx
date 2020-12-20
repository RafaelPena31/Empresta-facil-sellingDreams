import React, { useState } from 'react'

interface LoanContextProps {
  renda?: number
  tipo_beneficio?: string
  margem?: string
  modalidade_pessoal?: string
  valorSolicitado?: number
  nParcelas?: number
  valorParcela?: number
  juros?: number
}

export const LoanContext = React.createContext<{
  loanValue: LoanContextProps
  setLoanValue: (loanValue: LoanContextProps) => void
}>({
  loanValue: {},
  setLoanValue: () => null
})

export default function LoanContextProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const { children } = props

  const [loanValue, setLoanValue] = useState<LoanContextProps>({})

  return (
    <LoanContext.Provider
      value={{
        loanValue,
        setLoanValue
      }}>
      {children}
    </LoanContext.Provider>
  )
}
