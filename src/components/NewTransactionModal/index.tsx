import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';
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
        <button type="submit">Cadastrar</button>
      </form>
      <CloseButton>
        <X/>
      </CloseButton>
    </Content>
  </Dialog.Portal>
  )
}