import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
    maxAge: process.env.COOKIE_MAX_AGE
        ? parseInt(process.env.COOKIE_MAX_AGE, 10)
        : undefined,
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

export default cookieOptions;
