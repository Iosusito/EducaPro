'use server'

import { getSession } from "../lib/session";

export async function getName() {
    try {
        const session = await getSession();
        if (session) {
            const name = session.username;
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