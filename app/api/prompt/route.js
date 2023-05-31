import { connectedToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";

export const GET = async (req) => {
  try {
    await connectedToDB();

    const prompts = await Prompt.find({});

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};