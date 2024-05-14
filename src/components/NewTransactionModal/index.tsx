import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome'])
})

type NewTransactionInput = z.infer<typeof newTransactionFormSchema>
export function NewTransactionModal() {
  const {register, handleSubmit, formState: {isSubmitting}} = useForm<NewTransactionInput>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleNewTransaction(data: NewTransactionInput){
    await new Promise(resolve=> setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Dialog.Portal>
    <Overlay/>
    <Content>
      <Dialog.Title>Nova Transação</Dialog.Title>
      <form onSubmit={handleSubmit(handleNewTransaction)}>
        <input {...register('description')} type="text" placeholder='Descrição'/>
        <input {...register('price', {valueAsNumber: true})} type="number" placeholder='Preço'/>
        <input {...register('category')} type="text" placeholder='Categoria'/>
        <TransactionType>
          <TransactionTypeButton value='income' variant='income'>
            <ArrowCircleUp size={24}/>
            Entrada
          </TransactionTypeButton>
          <TransactionTypeButton value='outcome' variant='outcome'>
            <ArrowCircleDown size={24}/>
            Saída
          </TransactionTypeButton>
        </TransactionType>
        <button disabled={isSubmitting} type="submit">Cadastrar</button>
      </form>
      <CloseButton>
        <X/>
      </CloseButton>
    </Content>
  </Dialog.Portal>
  )
}