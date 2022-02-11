import logoImg from 'src/assets/logo.svg';
import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="My Finances" />
        <button type="button">Nova transação</button>
      </Content>
    </Container>
  );
}
