import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { ErrorTypes } from "../errors/catalog";
import { ILogin } from "../interfaces/ILogin";

const secret = String(process.env.JWT_SECRET);

const jwtConfig = {
  expiresIn: "10m",
  algorithm: "HS256",
};

class JwtService {
  static createToken(data: ILogin) {
    const token = jwt.sign({ data }, secret, jwtConfig as object);
    return `Bearer ${token}`;
  }

  static validateToken = (token: string) => {
    try {
      const { data } = jwt.verify(
        token.replace("Bearer ", ""),
        secret
      ) as jwt.JwtPayload;
      return data;
    } catch (error) {
      throw new Error(ErrorTypes.InvalidToken);
    }
  };
}

export default JwtService;
