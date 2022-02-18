import { useState } from 'react';
import Modal from 'react-modal';
import { DashBoard } from 'src/components/Dashboard';
import { Header } from 'src/components/Header';
import { NewTransactionModal } from 'src/components/NewTransactionModal';
import { GlobalStyle } from 'src/styles/global';
import { TransactionsProvider } from 'src/TransactionContext';

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
