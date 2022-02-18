import { useState } from 'react';
import Modal from 'react-modal';
import { DashBoard } from 'src/components/Dashboard';
import { Header } from 'src/components/Header';
import { NewTransactionModal } from 'src/components/NewTransactionModal';
import { TransactionsProvider } from 'src/hooks/useTransactions';
import { GlobalStyle } from 'src/styles/global';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <DashBoard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
