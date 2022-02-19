import deleteImg from 'src/assets/delete.svg';
import { useModal } from 'src/hooks/useModal';
import { useTransactions } from 'src/hooks/useTransactions';
import { Container } from './styles';

export function TransactionsTable() {
  const { transactions, selectTransaction } = useTransactions();
  const { openModal } = useModal();

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
                  onClick={() => {
                    selectTransaction(transaction);
                    openModal({ name: 'confirm-delete-transaction-modal' });
                  }}
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
