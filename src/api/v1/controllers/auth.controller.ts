import expressAsyncHandler from "express-async-handler";

import { githubOAuthService, googleOAuthService } from "../services";

const githubOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await githubOAuthService.getAccessToken(code);
    const user = await githubOAuthService.getUser(access_token);

    res.json(user);
});

const googleOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await googleOAuthService.getAccessToken(code);
    const user = await googleOAuthService.getUser(access_token);

    res.json(user);
});

export default {
    githubOAuth,
    googleOAuth,
};
