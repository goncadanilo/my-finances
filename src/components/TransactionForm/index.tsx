import { FormEvent, useEffect, useState } from 'react';
import incomeImg from 'src/assets/income.svg';
import outcomeImg from 'src/assets/outcome.svg';
import { useTransactions } from 'src/hooks/useTransactions';
import * as Yup from 'yup';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { transactionSchema } from './validation';

interface TransactionFormProps {
  beforeSubmit: () => void;
}

interface FormErros {
  title?: string;
  amount?: string;
  category?: string;
}

export function TransactionForm({ beforeSubmit }: TransactionFormProps) {
  const { selectedTransaction, createTransaction, updateTransaction } =
    useTransactions();

  const isUpdate = !!selectedTransaction;

  const [errors, setErrors] = useState<FormErros>({});
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

    try {
      const data = { title, amount, transactionType, category };
      await transactionSchema.validate(data, { abortEarly: false });

      if (isUpdate) {
        await updateTransaction(selectedTransaction.id, data);
      } else {
        await createTransaction(data);
      }

      beforeSubmit();
      clearForm();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = err.inner.reduce(
          (acc, { path, message }) => ({ ...acc, [`${path}`]: message }),
          {},
        );

        setErrors(error);
      }
    }
  }

  function clearForm() {
    setTitle('');
    setAmount(0);
    setCategory('');
    setTransactionType('deposit');
  }

  return (
    <Container onSubmit={handleSubmitForm}>
      <h2>{isUpdate ? 'Editar transação' : 'Cadastrar transação'}</h2>

      <>
        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        {errors.title && <span>{errors.title}</span>}
      </>

      <>
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />
        {errors.amount && <span>{errors.amount}</span>}
      </>

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

      <>
        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        {errors.category && <span>{errors.category}</span>}
      </>

      <button type="submit">{isUpdate ? 'Salvar' : 'Cadastrar'}</button>
    </Container>
  );
}
