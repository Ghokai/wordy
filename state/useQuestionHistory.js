import create from "zustand";

const useQuestionHistory = create((set) => ({
  history: [],
  addToHistory: (word) =>
    set((state) => ({ history: [word, ...state.history].slice(0, 12) })),
}));

export default useQuestionHistory;
