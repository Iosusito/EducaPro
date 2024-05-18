'use server'

import dbConnect from "../lib/dbConnect";
import Course from "@/models/course";

export async function createCourse(title: string, description: string) {

    // validaciones
    if (title === "" || description === "") {
        return { success: false, message: "Please fill all fields" };
    }

    try {
        await dbConnect();

        const course = new Course({ title, description });
        await course.save();

        return { success: true, message: "Course successfully created" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getCourses() {
    try {
        await dbConnect();

        const courses = await Course.find({});

        return { success: true, message: courses };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}