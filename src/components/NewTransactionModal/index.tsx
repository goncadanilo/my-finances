import Modal from 'react-modal';
import { CloseModalButton } from 'src/components/CloseModalButton';
import { TransactionForm } from 'src/components/TransactionForm';
import { useModal } from 'src/hooks/useModal';

export function NewTransactionModal() {
  const { isOpen, closeModal } = useModal();

  function handleCloseModal() {
    closeModal({ name: 'new-transaction-modal' });
  }

  return (
    <Modal
      isOpen={isOpen({ name: 'new-transaction-modal' })}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <CloseModalButton onClick={handleCloseModal} />

      <TransactionForm
        beforeSubmit={handleCloseModal}
        formTitle="Cadastrar transação"
        buttonText="Cadastrar"
      />
    </Modal>
  );
}
