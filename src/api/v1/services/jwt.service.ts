import { jwt } from "../../../../utils";
import { RefreshToken } from "../models";

interface AuthUser {
    user_id: string;
}

interface RefreshTokenRecord {
    user: string;
    token: string;
}

const generateTokens = (
    authUser: AuthUser,
): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.generateAccessToken(authUser);
    const refreshToken = jwt.generateRefreshToken(authUser);

    return { accessToken, refreshToken };
};

const manageRefreshToken = async (
    authUser: AuthUser,
    refreshToken: string,
): Promise<void> => {
    const existingRefreshToken = await RefreshToken.findOne({
        user: authUser.user_id,
    });

    if (existingRefreshToken) {
        existingRefreshToken.token = refreshToken;
        await existingRefreshToken.save();
    } else {
        const refresh = new RefreshToken({
            user: authUser.user_id,
            token: refreshToken,
        });
        await refresh.save();
    }
};

const verifyRefreshToken = (
    refreshToken: string,
    refresh: RefreshTokenRecord,
): AuthUser => {
    const decoded = jwt.verifyRefreshToken(refreshToken);

    if (!decoded || decoded.user_id !== refresh.user) {
        throw new Error("Invalid refresh token.");
    }

    return { user_id: decoded.user_id };
};

const generateAccessToken = (authUser: AuthUser): string => {
    const accessToken = jwt.generateAccessToken(authUser);
    return accessToken;
};

export default {
    generateTokens,
    manageRefreshToken,
    verifyRefreshToken,
    generateAccessToken,
};
