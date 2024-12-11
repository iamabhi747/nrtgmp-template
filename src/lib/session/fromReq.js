'use server';
import { getIronSession } from "iron-session";
import { serverOptions, defaultSession } from "./options";

export async function getSession(req, res) {
    const session = await getIronSession(req, res, serverOptions);

    if (!session.valid) {
        for (const key in defaultSession) {
            session[key] = defaultSession[key];
        }
        session.valid = true;
        await session.save();
    }

    return session;
}