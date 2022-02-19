import Modal from 'react-modal';
import { ConfirmDeleteTransactionModal } from 'src/components/ConfirmDeleteTransactionModal';
import { DashBoard } from 'src/components/Dashboard';
import { EditTransactionModal } from 'src/components/EditTransactionModal';
import { Header } from 'src/components/Header';
import { NewTransactionModal } from 'src/components/NewTransactionModal';
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

        <NewTransactionModal />
        <EditTransactionModal />
        <ConfirmDeleteTransactionModal />

        <GlobalStyle />
      </TransactionsProvider>
    </ModalProvider>
  );
}
