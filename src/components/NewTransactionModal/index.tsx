import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
export function NewTransactionModal() {
  return (
    <Dialog.Portal>
    <Overlay/>
    <Content>
      <Dialog.Title>Nova Transação</Dialog.Title>
      <form>
        <input type="text" placeholder='Descrição'/>
        <input type="number" placeholder='Preço'/>
        <input type="text" placeholder='Categoria'/>
        <TransactionType>
          <TransactionTypeButton variant='income'>
            <ArrowCircleUp size={24}/>
            Entrada
          </TransactionTypeButton>
          <TransactionTypeButton variant='outcome'>
            <ArrowCircleDown size={24}/>
            Saída
          </TransactionTypeButton>
        </TransactionType>
        <button type="submit">Cadastrar</button>
      </form>
      <CloseButton>
        <X/>
      </CloseButton>
    </Content>
  </Dialog.Portal>
  )
}