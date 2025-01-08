"use server";
// This is a server action

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function getAIResponse(prompt: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });
    return text;
  } catch (error) {
    console.error(error);
    return "Error generating response";
  }
}
