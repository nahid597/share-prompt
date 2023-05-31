import {connectedToDB} from '../../../../utils/database';
import Prompt from "../../../../models/prompt";

export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectedToDB();

        const newPrompt = new Prompt({
            creator: userId?.email,
            image: userId?.image,
            name: userId?.name,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});

    }catch(error) {
        console.log(error);
        return new Response("Failed to create new prompt", {status: 201});
    }

}