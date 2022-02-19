import deleteImg from 'src/assets/delete.svg';
import editImg from 'src/assets/edit.svg';
import emptyImg from 'src/assets/empty.svg';
import { useModal } from 'src/hooks/useModal';
import { useTransactions } from 'src/hooks/useTransactions';
import { ActionsContainer, Container, EmptyContainer } from './styles';

export function TransactionsTable() {
  const { transactions, selectTransaction } = useTransactions();
  const { openModal } = useModal();

  if (!transactions.length) {
    return (
      <EmptyContainer>
        <img src={emptyImg} alt="Nenhuma transação encontrada" />
        <h2>Nenhuma transação encontrada</h2>
      </EmptyContainer>
    );
  }

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
                <ActionsContainer>
                  <button
                    title="Editar transação"
                    type="button"
                    className="icon-button"
                    onClick={() => {
                      selectTransaction(transaction);
                      openModal({ name: 'edit-transaction-modal' });
                    }}
                  >
                    <img src={editImg} alt="Excluir transação" />
                  </button>

                  <button
                    title="Excluir transação"
                    type="button"
                    className="icon-button"
                    onClick={() => {
                      selectTransaction(transaction);
                      openModal({ name: 'confirm-delete-transaction-modal' });
                    }}
                  >
                    <img src={deleteImg} alt="Excluir transação" />
                  </button>
                </ActionsContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
