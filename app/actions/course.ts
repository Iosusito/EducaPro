'use server'

import dbConnect from "../lib/dbConnect";
import Course from "@/models/course";

export async function createCourse(title: string, description: string, students?: string[]) {

    // validaciones
    if (title === "" || description === "") {
        return { success: false, message: "Please fill all fields" };
    }

    try {
        await dbConnect();

        // si hay (id's de) studiantes, se añaden

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

        const courses = await Course.find();

        return { success: true, message: courses };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getCoursesOfUser(UserId: string) {
    try {

        return { success: true, message: "Courses of user" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getStudentsOfCourse(courseId: string) {
    try {

        return { success: true, message: "Students of course" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function addStudentToCourse(courseId: string, studentId: string) {
    try {

        return { success: true, message: "Student added to course successfully" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}