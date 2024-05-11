import { HeaderContainer, HeaderContent, NewTransactioButton } from "./styles";
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTransactioButton>Nova transação</NewTransactioButton>
          </Dialog.DialogTrigger>
          <Dialog.Portal>
            <Dialog.Overlay/>
            <Dialog.Content>
              <Dialog.Title>Nova Transação</Dialog.Title>
              <Dialog.Close></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}