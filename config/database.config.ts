interface DatabaseConfig {
    [key: string]: {
        url: string;
        options: Record<string, any>;
    };
}

const databaseConfig: DatabaseConfig = {
    development: {
        url: "mongodb://localhost:27017/localfluence-auth",
        options: {},
    },
    production: {
        url: process.env.MONGODB_URI || "",
        options: {},
    },
};

export default databaseConfig;
