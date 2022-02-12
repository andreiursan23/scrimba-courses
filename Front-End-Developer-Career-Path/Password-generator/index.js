const pass1El = document.getElementById("pass1");
const pass2El = document.getElementById("pass2");
const pass3El = document.getElementById("pass3");
const pass4El = document.getElementById("pass4");

const getAllCharacters = () => {
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  return range("!".charCodeAt(0), "z".charCodeAt(0), 1).map((x) =>
    String.fromCharCode(x)
  );
};

const getRandomIndexes = (charactersArrLenght) => {
  return Math.floor(Math.random() * charactersArrLenght);
};

const generatePasswords = () => {
  const allCharacters = getAllCharacters();
  const allCharactersLenght = allCharacters.length;

  let pass1 = "";
  let pass2 = "";
  let pass3 = "";
  let pass4 = "";

  for (let i = 0; i < 16; i++) {
    pass1 += allCharacters[getRandomIndexes(allCharactersLenght)];
    pass2 += allCharacters[getRandomIndexes(allCharactersLenght)];
    pass3 += allCharacters[getRandomIndexes(allCharactersLenght)];
    pass4 += allCharacters[getRandomIndexes(allCharactersLenght)];
  }

  pass1El.textContent = pass1;
  pass2El.textContent = pass2;
  pass3El.textContent = pass3;
  pass4El.textContent = pass4;
};
