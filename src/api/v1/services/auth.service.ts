import { User, OAuthLogin } from "../models";

interface UserProfile {
    first_name: string;
    family_name: string;
    username: string;
    avatar_url: string;
}

interface AuthUser {
    user_id: string;
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

export default {
    handleOAuthLogin,
};
