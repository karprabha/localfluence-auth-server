import { googleOAuthOptions } from "../../../../config/oauth.config";

export interface AuthResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
}

export interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

interface UserProfile {
    first_name: string;
    family_name: string;
    username: string;
    avatar_url: string;
}

const getAccessToken = async (code: string): Promise<string> => {
    const response = await fetch("https://oauth2.googleapis.com/token?", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            ...googleOAuthOptions,
            code,
        }),
    });

    if (response.ok) {
        const { access_token } = (await response.json()) as AuthResponse;
        return access_token;
    } else {
        const err: any = await response.json();
        throw new Error(
            `Request failed with status ${response.status}: ${err.error_description}`,
        );
    }
};

const getUser = async (access_token: string): Promise<UserProfile> => {
    const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    );

    if (response.ok) {
        const { given_name, family_name, email, picture } =
            (await response.json()) as GoogleUser;

        const user = {
            first_name: given_name,
            family_name,
            username: email,
            avatar_url: picture,
        };

        return user;
    } else {
        throw Error(response.statusText);
    }
};

export default {
    getAccessToken,
    getUser,
};
