import expressAsyncHandler from "express-async-handler";

import {
    jwtService,
    authService,
    githubOAuthService,
    googleOAuthService,
} from "../services";
import cookieOptions from "../../../../config/cookie.config";

const githubOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await githubOAuthService.getAccessToken(code);
    const user = await githubOAuthService.getUser(access_token);

    const authUser = await authService.handleOAuthLogin(user, "github");

    const { accessToken, refreshToken } = jwtService.generateTokens(authUser);
    await jwtService.manageRefreshToken(authUser, refreshToken);

    res.cookie("refreshToken", refreshToken, cookieOptions).json({
        accessToken,
    });
});

const googleOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await googleOAuthService.getAccessToken(code);
    const user = await googleOAuthService.getUser(access_token);

    const authUser = await authService.handleOAuthLogin(user, "google");

    const { accessToken, refreshToken } = jwtService.generateTokens(authUser);
    await jwtService.manageRefreshToken(authUser, refreshToken);

    res.cookie("refreshToken", refreshToken, cookieOptions).json({
        accessToken,
    });
});

export default {
    githubOAuth,
    googleOAuth,
};
