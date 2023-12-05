import { Schema, model } from "mongoose";

const passwordLoginSchema = new Schema({
    username: { type: String, required: true, maxLength: 50, unique: true },
    password: { type: String, required: true, maxLength: 128 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

passwordLoginSchema.index({ username: 1 });

const passwordLogin = model("passwordLogin", passwordLoginSchema);

export default passwordLogin;
