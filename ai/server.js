import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});