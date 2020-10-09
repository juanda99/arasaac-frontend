// validation functions
export const email = (value) => {
  if (!value) return false;
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

export const url = (value) => {
  if (!value) return true;
  const regexp = /^(http: \/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim;
  return regexp.test(value);
};
