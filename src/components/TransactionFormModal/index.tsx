import Modal from 'react-modal';
import { CloseModalButton } from 'src/components/CloseModalButton';
import { TransactionForm } from 'src/components/TransactionForm';
import { useModal } from 'src/hooks/useModal';
import { useTransactions } from 'src/hooks/useTransactions';

export function TransactionFormModal() {
  const { selectTransaction } = useTransactions();
  const { isOpen, closeModal } = useModal();

  function handleCloseModal() {
    selectTransaction(null);
    closeModal({ name: 'transaction-form-modal' });
  }

  return (
    <Modal
      isOpen={isOpen({ name: 'transaction-form-modal' })}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <CloseModalButton onClick={handleCloseModal} />

      <TransactionForm beforeSubmit={handleCloseModal} />
    </Modal>
  );
}
