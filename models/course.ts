import mongoose from "mongoose";
import { IUser } from "./user";

export interface ICourse extends mongoose.Document {
    name: string;
    description: string;
    Students: IUser[];
}

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //nombre de la coleccion el la DB????
    }]
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);