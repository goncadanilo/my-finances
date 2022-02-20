import Modal from 'react-modal';
import { ConfirmDeleteTransactionModal } from 'src/components/ConfirmDeleteTransactionModal';
import { DashBoard } from 'src/components/Dashboard';
import { Header } from 'src/components/Header';
import { TransactionFormModal } from 'src/components/TransactionFormModal';
import { ModalProvider } from 'src/hooks/useModal';
import { TransactionsProvider } from 'src/hooks/useTransactions';
import { GlobalStyle } from 'src/styles/global';

Modal.setAppElement('#root');

export function App() {
  return (
    <ModalProvider>
      <TransactionsProvider>
        <Header />
        <DashBoard />

        <TransactionFormModal />
        <ConfirmDeleteTransactionModal />

        <GlobalStyle />
      </TransactionsProvider>
    </ModalProvider>
  );
}
