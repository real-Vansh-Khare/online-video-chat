import { sign, verify, JwtPayload } from "jsonwebtoken";

const TEST_SECRET_KEY = "random secret key";
const EXPIRY_TIME = 60* 60 * 24;

/**
 * Generate JWT from username.
 * @param username string
 * @returns JwtPayload
 */
export const generate_jwt = (username: string) => {
  const payload: JwtPayload = {
    username: username
  };
  return sign(payload, process.env.JWT_SECRET ?? TEST_SECRET_KEY, { expiresIn: EXPIRY_TIME });
};

/**
 * To verify the existing JWT
 * @param token JwtPayload
 * @returns 
 */
export const verify_jwt = (token: string) => {
  const result = verify(token, (process.env.JWT_SECRET ?? TEST_SECRET_KEY) as string);
  return (result);
};
