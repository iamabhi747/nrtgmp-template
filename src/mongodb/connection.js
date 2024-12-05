import mongoose from "mongoose";

export const mongoConnect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected");
        return;
    }
    if (connectionState === 2) {
        console.log("Connecting ...");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (e) {
        console.log(e);
        throw new Error("Cannot connect to DB", e);
    }
};

export default mongoConnect;