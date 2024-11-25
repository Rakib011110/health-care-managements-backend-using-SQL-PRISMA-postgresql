import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const generateToken = (
  payload: any,
  secreate: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secreate, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token: string, secreate: Secret) => {
  return jwt.verify(token, secreate) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
