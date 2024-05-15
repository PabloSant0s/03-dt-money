import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: "income" | "outcome"
  createdAt: string
}

interface TransactionsContextProps {
  transactions: Transaction[],
  fetchTransactions: (query?: string)=> void
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response =  await api.get('/transactions', {
      params: {
        q: query
      }
    })   
    setTransactions(response.data)
  }

  useEffect(()=>{
    fetchTransactions()
  },[])

  return(
    <TransactionsContext.Provider value={{transactions, fetchTransactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}