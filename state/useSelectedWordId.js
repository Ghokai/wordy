import create from "zustand";

const useSelectedWordId = create((set) => ({
  selectedWordId: null,
  setSelectedWordId: (wordId) => set((_) => ({ selectedWordId: wordId })),
}));

export default useSelectedWordId;
