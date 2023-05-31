import { Schema, model, models } from "mongoose";
import User from './user';

const PromptSchema = new Schema({
    creator: {
        type: String,
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    prompt: {
        type: String,
        required: [true, 'Email is required']
    },
    tag: {
        type: String,
        required: [true, 'UserName is required']
    }
});

const Prompt = models?.Prompts || model("Prompts", PromptSchema);

export default Prompt;