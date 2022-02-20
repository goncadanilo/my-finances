import logoImg from 'src/assets/logo.svg';
import { useModal } from 'src/hooks/useModal';
import { Container, Content } from './styles';

export function Header() {
  const { openModal } = useModal();

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="My Finances" />
        <button
          type="button"
          onClick={() => openModal({ name: 'transaction-form-modal' })}
        >
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
