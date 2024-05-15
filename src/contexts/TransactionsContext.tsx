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
    const url = new URL('http://localhost:3333/transactions')

    if(query){
      url.searchParams.append('q', query)
    }

    const data = await fetch(url).then(response=> response.json())
    setTransactions(data)
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