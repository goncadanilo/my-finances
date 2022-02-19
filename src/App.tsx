import Modal from 'react-modal';
import { DashBoard } from 'src/components/Dashboard';
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

        <GlobalStyle />
      </TransactionsProvider>
    </ModalProvider>
  );
}
