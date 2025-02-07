import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isBlocked: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

// user passworrd hashing 
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.saltRound),
    );
    next();
});

// user password remove from response
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});


export const UserModel = model<IUser>("User", userSchema);