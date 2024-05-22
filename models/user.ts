import mongoose from "mongoose";
import { ICourse } from "./course";

const CourseSchema = new mongoose.Schema<ICourse>({
    id: { type: String, required: false },
    title: { type: String, required: false }
});

export interface IUser extends mongoose.Document {
    name: string;
    lastname: string;
    username: string; //el email sin el dominio
    email: string;
    phone: string;
    password: string;
    role: string; // Admin, User
    signUpDate: Date;
    courses: ICourse[];
}

const UserSchema = new mongoose.Schema<IUser>({
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
        required: false,
        default: Date.now
    },
    courses: [CourseSchema]
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);