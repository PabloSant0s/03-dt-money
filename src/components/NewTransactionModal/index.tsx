import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionInput = z.infer<typeof newTransactionFormSchema>
export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleNewTransaction(data: NewTransactionInput) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            {...register('description')}
            type="text"
            placeholder="Descrição"
          />
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            placeholder="Preço"
          />
          <input
            {...register('category')}
            type="text"
            placeholder="Categoria"
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
        <CloseButton>
          <X />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  )
}
