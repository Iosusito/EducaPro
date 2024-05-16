import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    role: string; // Admin, User
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "User"
    }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);