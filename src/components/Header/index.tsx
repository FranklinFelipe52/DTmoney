import Logoimg from '../../assets/Logo.svg'

import { Container, Content } from './styles'
import { useState } from 'react';

interface HeaderProps{
  onOpenNewTransactionsModal: () => void;
}
export function Header({onOpenNewTransactionsModal}:HeaderProps) {
  return (
   <Container>
       <Content>
       <img src={Logoimg} alt="dtmoneylogo" />
       <button type='button' onClick={onOpenNewTransactionsModal}>Nova transação</button>
       </Content>
       
   </Container>
  )
}
