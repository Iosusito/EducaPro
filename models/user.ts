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
    courses: mongoose.Schema.Types.ObjectId[];
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
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" //nombre de la coleccion el la DB????
    }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);