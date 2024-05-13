import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsTable, TransactionsTableContainer } from "./styles";

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: "income" | "outcome"
  createdAt: string
}

export function Transactions () {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const data = await fetch('http://localhost:3333/transactions').then(response=> response.json())
    setTransactions(data)
  }

  useEffect(()=>{
    loadTransactions()
  },[])

  return (
    <div>
      <Header/>
      <Summary/>
      <TransactionsTableContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction=>{
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsTableContainer>
    </div>
  )
}
