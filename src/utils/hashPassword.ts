import crypto from "crypto";

interface StoredPassword {
  salt: string;
  hash: string;
}

const setPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

export const storePassword = (password: string) => {
  const { salt, hash } = setPassword(password) as unknown as StoredPassword;
  const formattedPassword = `${salt};${hash}`;
  return formattedPassword;
};

export const validPassword = (password: string, storedPassword: string) => {
  const [storedSalt, storedHash] = storedPassword.split(";");
  const inputHash = crypto
    .pbkdf2Sync(password, storedSalt, 1000, 64, "sha512")
    .toString("hex");
  return inputHash === storedHash;
};
