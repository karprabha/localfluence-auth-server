import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 50, unique: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar_url: {
        type: String,
        default:
            "https://res.cloudinary.com/dn3rb7yf5/image/upload/v1698059883/blank_avatar_wdye0t.png",
        minlength: 10,
        maxlength: 255,
    },
});

UserSchema.index({ username: 1 });

const User = model("User", UserSchema);

export default User;
