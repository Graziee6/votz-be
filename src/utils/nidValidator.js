const nidValidator = (nid) => {
  const NidRegex = /[0-9]{16}/;
  return NidRegex.test(nid);
};

export default nidValidator;
