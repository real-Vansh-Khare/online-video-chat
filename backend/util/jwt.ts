import { sign, verify, JwtPayload } from "jsonwebtoken";

/**
 * Generate JWT from username.
 * @param username string
 * @returns JwtPayload
 */
export const generate_jwt = (username: string) => {
  const payload: JwtPayload = {
    username: username
  };
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: (process.env.JWT_EXPIRY_TIME as string) });
};

/**
 * To verify the existing JWT
 * @param token JwtPayload
 * @returns 
 */
export const verify_jwt = (token: string) => {
  const result = verify(token, process.env.JWT_SECRET as string);
  return (result);
};
