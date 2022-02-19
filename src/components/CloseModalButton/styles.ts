import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  border: 0;
  background: transparent;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;
