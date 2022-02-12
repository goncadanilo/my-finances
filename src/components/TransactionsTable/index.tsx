import { useEffect } from 'react';
import { api } from 'src/services/api';
import { Container } from './styles';

export function TransactionsTable() {
  useEffect(() => {
    api.get('transactions').then(response => console.log(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$ 12.000</td>
            <td>Desenvolvimento</td>
            <td>12/02/2022</td>
          </tr>
          <tr>
            <td>Internet</td>
            <td className="withdraw">- R$ 109,99</td>
            <td>Casa</td>
            <td>15/01/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
