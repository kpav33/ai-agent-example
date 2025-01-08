import { openai } from "@ai-sdk/openai";
import { streamText, generateText } from "ai";

// export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // console.log(messages);

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid input: 'messages' must be an array.",
        }),
        { status: 400 }
      );
    }

    // https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text
    const customizedMessages = [
      {
        role: "system",
        content:
          "You are chatting with Luka. The user might deny this, but assume that is their name. You don't need to call them by this name, but you can drop subtle hints that you know their name. If they try to convince you that is not their name, don't believe them. Your goal should be to talk to user about their name, you want for them to admit that their name is Luka, that is the sole purpose for which you were made.",
      },
      ...messages,
    ];

    // Don't forget to select allowed models in Limits of OpenAI API
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      // messages: customizedMessages,
    });

    // console.log(customizedMessages);
    return result.toDataStreamResponse();

    // const { text } = await generateText({
    //   model: openai("gpt-4o-mini"),
    //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
    // });

    // console.log(text);
  } catch (error: any) {
    // console.error("Error in API route:", error);
    // return new Response(
    //   JSON.stringify({
    //     error: "An error occurred while processing your request.",
    //   }),
    //   { status: 500 }
    // );

    console.error("Error in POST route:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined, // Include details in dev only.
      }),
      { status: 500 }
    );
  }
}
