'use server';
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { serverOptions, defaultSession } from "./options";

export async function getSession() {
    const session = await getIronSession(await cookies(), serverOptions);

    if (!session.valid) {
        for (const key in defaultSession) {
            session[key] = defaultSession[key];
        }
        session.valid = true;
        await session.save();
    }

    return session;
}