'use server'

import dbConnect from "../lib/dbConnect";
import User from "@/models/user";
import { createSession } from "../lib/session";
import bcrypt from "bcryptjs";

export async function signup(email: string, name: string, password: string, confirmPassword: string) {

    // validaciones
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        return { success: false, message: "Please fill all fields" };

    } else if (password !== confirmPassword) {
        return { success: false, message: "The two passwords do not match" };

    } else if (password.length < 8) {
        return { success: false, message: "The password has to be at least 8 characters" };
    }

    try {
        await dbConnect();

        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return { success: false, message: "User already exist" };
        }

        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, name, password: hashedPassword });
        await user.save();
        await createSession(user._id, User.name); // user y User ???? Preguntar a Emilio

        return { success: true, message: "User created successfully" };

    } catch (error) {
        console.log(error);
        return { success: false, message: "Internal error while creating user" };
    }
}