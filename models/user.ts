import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    name: string;
    password: string;
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
    }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);