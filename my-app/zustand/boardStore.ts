import { create } from 'zustand';

const defaultValues = { id: '', title: '' };

type BoardState = {
  modalOpen: boolean;
  initialValues: typeof defaultValues;
};

type BoardActions = {
  setModalOpen: (id: string, title: string) => void;
  setModalClose: () => void;
};

export const useBoardStore = create<BoardState & BoardActions>((set) => ({
  modalOpen: false,
  setModalOpen: (id: string, title: string) => {
    set((state) => ({ modalOpen: true, initialValues: { id, title } }));
  },
  setModalClose: () => {
    set((state) => ({
      modalOpen: false,
      initialValues: defaultValues,
    }));
  },
  initialValues: defaultValues,
}));
