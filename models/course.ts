import mongoose from "mongoose";
import { IUser } from "./user";

const UserSchema = new mongoose.Schema<IUser>({
    id: { type: String, required: false },
    email: { type: String, required: false }
});

export interface ICourse extends mongoose.Document {
    title: string;
    description: string;
    background: string; //color que aparecera en el cuadro de la lista de cursos
    students: IUser[];
}

const CourseSchema = new mongoose.Schema<ICourse>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    background: {
        type: String,
        default: "#ffffff", // blanco
        required: true
    },
    students: [UserSchema]
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);