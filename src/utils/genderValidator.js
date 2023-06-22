const genderValidator = (gender) => {
  const genderRegex = /[male|female]/;
  return genderRegex.test(gender);
};

export default genderValidator;
