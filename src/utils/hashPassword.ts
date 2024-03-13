import crypto from "crypto";

const salt = crypto.randomBytes(16).toString("hex");

export const setPassword = (password: string) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
};

export const validPassword = (password: string, hash: string) => {
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashPassword === hash;
};
