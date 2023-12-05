import expressAsyncHandler from "express-async-handler";

import {
    authService,
    githubOAuthService,
    googleOAuthService,
} from "../services";

const githubOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await githubOAuthService.getAccessToken(code);
    const user = await githubOAuthService.getUser(access_token);

    const authUser = await authService.handleOAuthLogin(user, "github");

    res.json({ user, authUser });
});

const googleOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await googleOAuthService.getAccessToken(code);
    const user = await googleOAuthService.getUser(access_token);

    const authUser = await authService.handleOAuthLogin(user, "google");

    res.json({ user, authUser });
});

export default {
    githubOAuth,
    googleOAuth,
};
