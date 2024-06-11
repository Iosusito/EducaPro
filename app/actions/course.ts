'use server'

import dbConnect from "../lib/dbConnect";
import Course from "@/models/course";
import User from "@/models/user";

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

        const courses = await Course.find().select("_id title background");

        return { success: true, message: courses };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getCoursesOfUser(UserId: string) {
    try {
        await dbConnect();

        const user = await User.findById(UserId).populate('courses');
        if (!user) return { success: false, message: "User not found" };

        return { success: true, message: user.courses };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getStudentsOfCourse(courseId: string) {
    try {
        await dbConnect();

        const course = await Course.findById(courseId).populate('students');
        if (!course) return { success: false, message: "Course not found" };

        return { success: true, message: course.students };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function addStudentToCourse(courseTitle: string, studentEmail: string) {
    try {
        await dbConnect();

        const course = await Course.findOne({ title: courseTitle });
        if (!course) return { success: false, message: "Course not found" };

        const student = await User.findOne({ email: studentEmail });
        if (!student) return { success: false, message: "Student not found" };

        await Course.updateOne(
            { title: courseTitle },
            { $push: { students: student } }
        );

        await User.updateOne(
            { email: studentEmail },
            { $push: { courses: course } }
        );

        return { success: true, message: "Student added to course successfully" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function deleteCourse(courseId: string) {
    try {
        await dbConnect();

        const course = await Course.findById(courseId);
        if (!course) return { success: false, message: "Course not found" };

        await Course.findByIdAndDelete(courseId);

        return { success: true, message: "Course deleted successfully" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}