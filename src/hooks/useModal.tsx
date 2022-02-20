import { createContext, ReactNode, useContext, useState } from 'react';

interface Modal {
  name: 'transaction-form-modal' | 'confirm-delete-transaction-modal';
}

interface ModalContextData {
  isOpen: (props: Modal) => boolean;
  openModal: (props: Modal) => void;
  closeModal: (props: Modal) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState({
    name: '',
    open: false,
  });

  function openModal({ name }: Modal) {
    setModal({ name, open: true });
  }

  function closeModal({ name }: Modal) {
    setModal({ name, open: false });
  }

  function isOpen({ name }: Modal) {
    return modal.name === name && modal.open;
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
