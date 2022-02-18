import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface TransactionContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput)=>Promise<void>;
}
const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData)

interface Transaction{
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
interface TransactionProviderProps{
    children: ReactNode
}
export function TransactionProvider({children}:TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    useEffect(()=>{
        api.get('/transaction')
        .then(({data})=>setTransactions(data.transactions));
    }, [])

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transaction', {
            ...transactionInput,
            createdAt: new Date()
        });
        const {transaction} = response.data;
        setTransactions((value)=>[...value, transaction])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}