import { Container } from "./styles";
import EntradaImg from '../../assets/Entradas.svg'
import SaidaImg from '../../assets/Saídas.svg'
import TotalImg from '../../assets/Total.svg'
import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";


export function Summary() {
    const {transactions} = useTransactions();
    const sumary = transactions.reduce((acc, transaction)=>{
        if(transaction.type === 'deposit'){
             acc.deposit += transaction.amount;
             acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;
    },{
        deposit: 0,
        withdraw: 0,
        total: 0
    })



  return (
      <Container>
        <div>
            <header>
                <p>Entradas</p>
                <img src={EntradaImg} alt="Entradas" />
            </header>
            <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(sumary.deposit)}</strong>
        </div>
        <div>
            <header>
                <p>Saídas</p>
                <img src={SaidaImg} alt="Saídas" />
            </header>
            <strong>-{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(sumary.withdraw)}</strong>
        </div>
        <div className="background-green">
            <header>
                <p>Total</p>
                <img src={TotalImg} alt="Total" />
            </header>
            <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(sumary.total)}</strong>
        </div>
      </Container>
    
  )
}
