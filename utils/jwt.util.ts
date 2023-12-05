import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;
const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET as string;

interface AuthUser {
    user_id: string;
}

const generateAccessToken = (payload: AuthUser) =>
    jwt.sign(payload, secretKey, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

const generateRefreshToken = (payload: AuthUser) =>
    jwt.sign(payload, refreshTokenKey, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

const verifyAccessToken = (token: string) => {
    try {
        const tokenWithoutBearer = token.split(" ")[1];
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, refreshTokenKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
