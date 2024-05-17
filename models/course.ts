import mongoose from "mongoose";
import { IUser } from "./user";

export interface ICourse extends mongoose.Document {
    title: string;
    description: string;
    color: string; //color que aparecera en el cuadro de la lista de cursos
    students: IUser[];
}

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#000000", //negro (provisional)
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //nombre de la coleccion el la DB????
    }]
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);