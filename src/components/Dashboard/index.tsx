import { Summary } from 'src/components/Summary';
import { TransactionsTable } from 'src/components/TransactionsTable';
import { Container } from './styles';

export function DashBoard() {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
