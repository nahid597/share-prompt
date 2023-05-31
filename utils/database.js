import mongoose from "mongoose";

let isConnected = false;

export const connectedToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongDB already connected...');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log("Mongodb connected successfully");
    } catch(error) {
        console.log(error);
    }
};