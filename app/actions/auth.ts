'use server'

import dbConnect from "../lib/dbConnect";
import User from "@/models/user";
import Course from "@/models/course";
import { createSession, deleteSession, getSession } from "../lib/session";
import bcrypt from "bcryptjs";

export async function signup(name: string, lastname: string, email: string, phone: string, password: string, confirmPassword: string) {

    // validaciones
    if (name === "" || lastname === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        return { success: false, message: "Please fill all fields" };

    } else if (password !== confirmPassword) {
        return { success: false, message: "The two passwords do not match" };

    } else if (password.length < 8) {
        return { success: false, message: "The password has to be at least 8 characters" };
    }

    // signup
    try {
        await dbConnect();

        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return { success: false, message: "This email is alredy in use" };
        }

        // el username es el email sin el dominio
        const username = email.split("@")[0];

        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // crear y guardar el usuario en la BD
        const user = new User({ name, lastname, username, email, phone, password: hashedPassword });
        await user.save();

        // crear la sesion en el navegador
        await createSession(user._id, user.name, user.role);

        return { success: true, message: "Sign up successful" };

    } catch (error) {
        console.log(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function signin(email: string, password: string) {

    // validaciones
    if (email === "" || password === "") {
        return { success: false, message: "Please fill all fields" };
    }

    // signin
    try {
        await dbConnect();

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { success: false, message: "Email or password incorrect" };
        }

        await createSession(user._id, user.username, user.role);

        return { success: true, message: "Sign in successful" };

    } catch (error) {
        console.log(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function logout() {
    try {
        deleteSession();
        return { success: true, message: "Sign out successful" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

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

export async function getName() {
    try {
        const session = await getSession();
        if (session) {
            const name = session.name;
            return { success: true, message: name }

        } else {
            return { success: false, message: "No session found" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}

export async function getRole() {
    try {
        const session = await getSession();
        if (session) {
            const role = session.role;
            return { success: true, message: role }

        } else {
            return { success: false, message: "No session found" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: "An internal error has occured" };
    }
}