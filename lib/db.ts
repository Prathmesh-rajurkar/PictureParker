import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        const opts = {
        bufferCommands: true,
        maxPoolSize: 10, // Adjust as needed
        };
    
        mongoose
        .connect(MONGODB_URI, opts)
        .then(() => {
        mongoose.connection
        });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}