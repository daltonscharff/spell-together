export const addLetterToInput = (
  letter: string,
  inputLetters: string,
  setInputLetters: (inputLetters: string) => void
) => {
  if (inputLetters.length > 20) return;
  setInputLetters(inputLetters + letter.toUpperCase());
};

export const deleteLetterFromInput = (
  inputLetters: string,
  setInputLetters: (inputLetters: string) => void
) => setInputLetters(inputLetters.slice(0, inputLetters.length - 1));

export const submitInput = (
  setInputLetters: (inputLetters: string) => void
) => {
  // socket.emit("submitWord", {
  //   username,
  //   roomCode,
  //   word: inputLetters,
  // });
  setInputLetters("");
};

export const handleLetterInput = (
  key: string,
  inputLetters: string,
  setInputLetters: (inputLetters: string) => void
) => {
  if (/[a-zA-Z]/.test(key) && key.length === 1) {
    addLetterToInput(key, inputLetters, setInputLetters);
  } else if (key === "Backspace") {
    deleteLetterFromInput(inputLetters, setInputLetters);
  } else if (key === "Enter") {
    submitInput(setInputLetters);
  }
};
