import deleteImg from 'src/assets/delete.svg';
import { useTransactions } from 'src/hooks/useTransactions';
import { Container } from './styles';

export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.transactionType}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(transaction.createdAt))}
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <img src={deleteImg} alt="Excluir transação" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
