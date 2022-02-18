import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider} from "./hooks/useTransactions";



export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }

  function handleNewTransactionModalClose() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionsModal={handleNewTransactionModalOpen}/>
      <Dashboard/>
      <GlobalStyle/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleNewTransactionModalClose} />
      
    </TransactionProvider>
  );
}