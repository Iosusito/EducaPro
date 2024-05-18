import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    lastname: string;
    username: string; //el email sin el dominio
    email: string;
    phone: string;
    password: string;
    role: string; // Admin, User
    signUpDate: Date;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "User"
    },
    signUpDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);