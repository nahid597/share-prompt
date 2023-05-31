import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        unique: [true, 'UserName already exists'],
        required: [true, 'UserName is required']
    },
    image: {
        type: String
    }
});

const User = models?.Users || model("Users", UserSchema);

export default User;