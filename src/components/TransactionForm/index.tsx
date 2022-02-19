import { FormEvent, useEffect, useState } from 'react';
import incomeImg from 'src/assets/income.svg';
import outcomeImg from 'src/assets/outcome.svg';
import { useTransactions } from 'src/hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface TransactionFormProps {
  beforeSubmit?: () => void;
  formTitle: string;
  buttonText: string;
}

export function TransactionForm({
  beforeSubmit,
  formTitle,
  buttonText,
}: TransactionFormProps) {
  const { selectedTransaction, createTransaction, updateTransaction } =
    useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState<
    'deposit' | 'withdraw'
  >('deposit');

  useEffect(() => {
    if (selectedTransaction) {
      setTitle(selectedTransaction.title);
      setAmount(selectedTransaction.amount);
      setCategory(selectedTransaction.category);
      setTransactionType(selectedTransaction.transactionType);
    }
  }, [selectedTransaction]);

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (selectedTransaction) {
      await updateTransaction(selectedTransaction.id, {
        title,
        amount,
        transactionType,
        category,
      });
    } else {
      await createTransaction({ title, amount, transactionType, category });
    }

    beforeSubmit?.();
    clearForm();
  }

  function clearForm() {
    setTitle('');
    setAmount(0);
    setCategory('');
    setTransactionType('deposit');
  }

  return (
    <Container onSubmit={handleSubmitForm}>
      <h2>{formTitle}</h2>

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

      <button type="submit">{buttonText}</button>
    </Container>
  );
}
