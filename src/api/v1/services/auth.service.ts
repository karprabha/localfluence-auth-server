import bcrypt from "bcryptjs";

import { User, OAuthLogin, PasswordLogin, RefreshToken } from "../models";

interface UserProfile {
    first_name: string;
    family_name: string;
    username: string;
    avatar_url: string;
}

interface AuthUser {
    user_id: string;
}

interface SignUpData {
    first_name: string;
    family_name: string;
    username: string;
    password: string;
}

interface SignedUpUser {
    first_name: string;
    family_name: string;
    username: string;
}

interface LoginData {
    username: string;
    password: string;
}

interface RefreshTokenRecord {
    user: string;
    token: string;
}

const handleOAuthLogin = async (
    user: UserProfile,
    provider: string,
): Promise<AuthUser> => {
    try {
        const oauthLogin = await OAuthLogin.findOne({
            username: user.username,
            provider: provider,
        });

        if (oauthLogin) {
            return { user_id: oauthLogin.user.toString() };
        }

        const existingUser = await User.findOne({
            username: user.username,
        });

        if (existingUser) {
            throw new Error("Username is already in use");
        }

        const newUser = new User({
            first_name: user.first_name,
            family_name: user.family_name,
            username: user.username,
            avatar_url: user.avatar_url,
        });

        const savedUser = await newUser.save();

        const newOAuthLogin = new OAuthLogin({
            username: user.username,
            provider: provider,
            user: savedUser._id,
        });

        await newOAuthLogin.save();

        return { user_id: savedUser._id.toString() };
    } catch (error) {
        throw error;
    }
};

const handleUserSignUp = async ({
    first_name,
    family_name,
    username,
    password,
}: SignUpData): Promise<SignedUpUser> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        first_name,
        family_name,
        username,
    });

    const savedUser = await newUser.save();

    const newPasswordLogin = new PasswordLogin({
        username: username,
        password: hashedPassword,
        user: savedUser._id,
    });

    await newPasswordLogin.save();

    return {
        first_name: newUser.first_name,
        family_name: newUser.family_name,
        username: newUser.username,
    };
};

const handlePasswordLogin = async ({
    username,
    password,
}: LoginData): Promise<AuthUser | null> => {
    try {
        const user = await PasswordLogin.findOne({ username });

        if (!user) {
            return null;
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return null;
        }

        return { user_id: user._id.toString() };
    } catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
};

const handleUserLogout = async (refreshToken: string): Promise<string> => {
    try {
        const deletedToken = await RefreshToken.findOneAndDelete({
            token: refreshToken,
        });

        if (!deletedToken) {
            throw new Error("Token not found.");
        }

        console.log(`User with ID ${deletedToken.user} logged out.`);

        return "Logout successful.";
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Internal server error.");
    }
};

const getRefreshTokenRecord = async (
    refreshToken: string,
): Promise<RefreshTokenRecord> => {
    if (!refreshToken) {
        throw new Error("Refresh token is required.");
    }

    const refresh = await RefreshToken.findOne({ token: refreshToken });

    if (!refresh) {
        throw new Error("Refresh token not found.");
    }

    return { user: refresh.user.toString(), token: refresh.token };
};

export default {
    handleOAuthLogin,
    handleUserSignUp,
    handlePasswordLogin,
    handleUserLogout,
    getRefreshTokenRecord,
};
