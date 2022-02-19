import Modal from 'react-modal';
import { CloseModalButton } from 'src/components/CloseModalButton';
import { useModal } from 'src/hooks/useModal';
import { useTransactions } from 'src/hooks/useTransactions';
import { ActionsContainer, Container } from './styles';

export function ConfirmDeleteTransactionModal() {
  const { selectedTransaction, selectTransaction, deleteTransaction } =
    useTransactions();
  const { isOpen, closeModal } = useModal();

  async function handleDeleteTransaction() {
    await deleteTransaction(selectedTransaction?.id as number);
    handleCloseModal();
  }

  function handleCloseModal() {
    selectTransaction(null);
    closeModal({ name: 'confirm-delete-transaction-modal' });
  }

  return (
    <Modal
      isOpen={isOpen({ name: 'confirm-delete-transaction-modal' })}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <CloseModalButton onClick={handleCloseModal} />

      <Container>
        <h2>
          Excluindo <span>{`${selectedTransaction?.title}`}</span>
        </h2>

        <p>Tem certeza que deseja excluir essa transação?</p>
      </Container>

      <ActionsContainer>
        <button type="button" onClick={handleCloseModal}>
          Cancelar
        </button>
        <button type="button" onClick={handleDeleteTransaction}>
          Excluir
        </button>
      </ActionsContainer>
    </Modal>
  );
}
