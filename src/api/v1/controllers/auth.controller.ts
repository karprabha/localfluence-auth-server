import expressAsyncHandler from "express-async-handler";

import {
    jwtService,
    authService,
    githubOAuthService,
    googleOAuthService,
} from "../services";
import { cookieConfig } from "../../../../config";

const githubOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await githubOAuthService.getAccessToken(code);
    const user = await githubOAuthService.getUser(access_token);

    const authUser = await authService.handleOAuthLogin(user, "github");

    const { accessToken, refreshToken } = jwtService.generateTokens(authUser);
    await jwtService.manageRefreshToken(authUser, refreshToken);

    res.cookie("refreshToken", refreshToken, cookieConfig).json({
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

    res.cookie("refreshToken", refreshToken, cookieConfig).json({
        accessToken,
    });
});

const signUp = expressAsyncHandler(async (req, res, next) => {
    const { first_name, family_name, username, password } = req.body;

    const signedUpUser = await authService.handleUserSignUp({
        first_name,
        family_name,
        username,
        password,
    });

    res.status(201).json(signedUpUser);
});

export default {
    signUp,
    githubOAuth,
    googleOAuth,
};
