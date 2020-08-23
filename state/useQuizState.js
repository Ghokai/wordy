import create from "zustand";

const useQuizState = create((set) => ({
  successful: 0,
  failed: 0,
  questionAnswered: () =>
    set((state) => ({ successful: state.successful + 1 })),
  questionNotAnswered: () => set((state) => ({ failed: state.failed + 1 })),
}));

export default useQuizState;
