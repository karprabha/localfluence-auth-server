import expressAsyncHandler from "express-async-handler";

import { githubOAuthService } from "../services";

const githubOAuth = expressAsyncHandler(async (req, res, next) => {
    const code = req.query.code as string;

    const access_token = await githubOAuthService.getAccessToken(code);
    const user = await githubOAuthService.getUser(access_token);

    res.json(user);
});

export default {
    githubOAuth,
};
