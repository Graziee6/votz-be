const passwordValidator = (password) => {
  const passwordRegex = /[a-z0-9]{5,}/i;
  return passwordRegex.test(password);
};

export default passwordValidator;
