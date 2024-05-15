import { HeaderContainer, HeaderContent, NewTransactioButton } from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTransactioButton>Nova transação</NewTransactioButton>
          </Dialog.DialogTrigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
