import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null};

export const connectToDatabase = async () => {
    if (cached.conn) {
        console.log("MongoDB: using cached connection");
        return cached.conn;
    }

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing!');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'pokellector',
        bufferCommands: false,
    })

    try {
        cached.conn = await cached.promise;

        console.log("MongoDB connected successfully!");
        return cached.conn;
    } catch (error) {
        console.error("MongoDb connection failed: ", error);

        cached.promise = null;
        
        throw error;
    }
};