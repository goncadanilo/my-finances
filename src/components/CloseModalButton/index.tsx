import closeImg from 'src/assets/close.svg';
import { Container } from './styles';

interface CloseModalButtonProps {
  onClick: () => void;
}

export function CloseModalButton({ onClick }: CloseModalButtonProps) {
  return (
    <Container type="button" onClick={onClick}>
      <img src={closeImg} alt="Fechar modal" />
    </Container>
  );
}
