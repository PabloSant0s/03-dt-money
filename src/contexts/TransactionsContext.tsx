import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: "income" | "outcome"
  createdAt: string
}

interface TransactionsContextProps {
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const data = await fetch('http://localhost:3333/transactions').then(response=> response.json())
    setTransactions(data)
  }

  useEffect(()=>{
    loadTransactions()
  },[])

  return(
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}