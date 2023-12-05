import { Schema, model } from "mongoose";

const oauthLoginSchema = new Schema({
    username: { type: String, required: true, maxLength: 50, unique: true },
    provider: { type: String, required: true, maxLength: 20 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

oauthLoginSchema.index({ username: 1 });

const OAuthLogin = model("OAuthLogin", oauthLoginSchema);

export default OAuthLogin;
