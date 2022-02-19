import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from 'src/services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  transactionType: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  selectTransaction: (transaction: Transaction | null) => void;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transactions: newTransaction } = response.data;

    setTransactions([...transactions, newTransaction]);
  }

  async function deleteTransaction(id: number) {
    await api.delete(`/transactions/${id}`);
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  }

  function selectTransaction(transaction: Transaction | null) {
    setSelectedTransaction(transaction);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        selectedTransaction,
        selectTransaction,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
