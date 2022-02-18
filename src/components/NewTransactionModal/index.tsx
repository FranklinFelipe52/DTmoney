import Modal from 'react-modal';
import { Container, RadioBox, TransitionTypeContainer } from './styles';
import ImgClose from '../../assets/close.svg'
import ImgEntrada from '../../assets/Entradas.svg'
import ImgSaida from '../../assets/Saídas.svg'
import { FormEvent, useContext, useState } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';
Modal.setAppElement('#root');

interface NewTransactionModalProps{
    onRequestClose: () => void;
    isOpen: boolean;
}
export function NewTransactionModal({onRequestClose, isOpen}:NewTransactionModalProps){
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    const {createTransaction} = useTransactions();

    async function handleCreateNewTraaction(event: FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type
        })
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('')
        onRequestClose()
    }
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
        
      >
          <button 
          type='button' 
          onClick={onRequestClose}
          className='react-modal-close'>
              <img src={ImgClose} alt="Fechar modal" />
          </button>
        <Container onSubmit={handleCreateNewTraaction}>
            <h2>Cadastrar transação</h2>
            <input
                type="text" 
                placeholder='Titulo'
                value={title}
                onChange={({target})=> setTitle(target.value)} />
            <input 
                type="number" 
                placeholder='Valor'
                value={amount}
                onChange={({target})=> setAmount(Number(target.value))} />
            <TransitionTypeContainer>
                <RadioBox 
                type='button'
                onClick={()=> setType('deposit')}
                isActive={type === 'deposit'}
                activeColor='green'>
                    <img src={ImgEntrada} alt="" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                type='button'
                onClick={()=> setType('withdraw')}
                isActive={type === 'withdraw'}
                activeColor='red'>
                    <img src={ImgSaida} alt="" />
                    <span>Saída</span>
                </RadioBox>
            </TransitionTypeContainer>
            <input 
                type="text" 
                placeholder='Categoria'
                value={category}
                onChange={({target})=> setCategory(target.value)} />
            <button type='submit'>Cadastrar</button>
        </Container>
      </Modal>
    )
}