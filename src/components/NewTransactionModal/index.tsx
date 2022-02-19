import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import incomeImg from 'src/assets/income.svg';
import outcomeImg from 'src/assets/outcome.svg';
import { CloseModalButton } from 'src/components/CloseModalButton';
import { useModal } from 'src/hooks/useModal';
import { useTransactions } from 'src/hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

export function NewTransactionModal() {
  const { createTransaction } = useTransactions();
  const { isOpen, closeModal } = useModal();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState<
    'deposit' | 'withdraw'
  >('deposit');

  function handleCloseModal() {
    closeModal({ name: 'new-transaction-modal' });
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({ title, amount, transactionType, category });

    clearForm();
    handleCloseModal();
  }

  function clearForm() {
    setTitle('');
    setAmount(0);
    setCategory('');
    setTransactionType('deposit');
  }

  return (
    <Modal
      isOpen={isOpen({ name: 'new-transaction-modal' })}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <CloseModalButton onClick={handleCloseModal} />

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setTransactionType('deposit')}
            isActive={transactionType === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setTransactionType('withdraw')}
            isActive={transactionType === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
