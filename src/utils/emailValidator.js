const emailValidator = (email) => {
  const EmailRegex = /[a-z0-9]{5,10}[@(gmail|yahoo).com]/;
  return EmailRegex.test(email);
};

export default emailValidator;
