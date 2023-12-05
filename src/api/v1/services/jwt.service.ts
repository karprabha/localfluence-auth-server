import { jwt } from "../../../../utils";
import { RefreshToken } from "../models";

interface AuthUser {
    user_id: string;
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

export default {
    generateTokens,
    manageRefreshToken,
};
