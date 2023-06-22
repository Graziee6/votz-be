const phoneValidator = (phone) => {
  const PhoneRegex = /07(8|9){1}[0-9]{7}/;
  return PhoneRegex.test(phone);
};

export default phoneValidator;
