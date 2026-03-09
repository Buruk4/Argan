import bcrypt, { genSalt } from "bcrypt";

const hashedPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export { hashedPassword };
