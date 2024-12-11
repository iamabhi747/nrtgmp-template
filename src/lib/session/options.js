
export const serverOptions = {
    cookieName: process.env.SESSION_COOKIE_NAME || "NSESSION",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export const defaultSession = {
    
};