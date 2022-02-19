import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    color: var(--text-title);
    margin-bottom: 1rem;

    span {
      color: var(--text-body);
      text-decoration: italic;
    }
  }

  p {
    color: var(--text-title);
    margin-bottom: 2rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--red);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 2.5rem;

    transition: filter 0.2s;

    &:first-child {
      background: var(--text-body);
      margin-right: 1.5rem;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
