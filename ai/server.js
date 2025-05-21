import * as dotenv from "dotenv";
dotenv.config();

import OpenAI, { Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from "express";
