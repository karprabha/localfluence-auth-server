import { githubOAuthOptions } from "../../../../config/oauth.config";

interface AuthResponse {
    access_token: string;
    token_type: string;
    scope: string;
}

interface GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: string;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}

interface UserProfile {
    first_name: string;
    family_name: string;
    username: string;
    avatar_url: string;
    email: string;
}

const getAccessToken = async (code: string): Promise<string> => {
    const response = await fetch(
        `https://github.com/login/oauth/access_token?`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                ...githubOAuthOptions,
                code,
            }),
        },
    );

    if (response.ok) {
        const { access_token } = (await response.json()) as AuthResponse;
        return access_token;
    } else {
        throw Error(response.statusText);
    }
};

const getUser = async (access_token: string): Promise<UserProfile> => {
    const response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (response.ok) {
        const { login, avatar_url, email, name } =
            (await response.json()) as GithubUser;

        const user = {
            first_name: name.split(" ")[0] || "",
            family_name: name.split(" ").slice(1).join(" ") || "",
            username: login,
            avatar_url,
            email,
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
