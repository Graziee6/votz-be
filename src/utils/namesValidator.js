const namesValidator = (names) => {
  const namesRegex = /[a-z\\s]{3,30}/i;
  return namesRegex.test(names);
};

export default namesValidator;
