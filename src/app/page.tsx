// "use client";

// import { useState } from "react";
// import { getAIResponse } from "../server/ai";

import Chat from "@/components/Chat";
// import AiForm from "@/components/AiForm";

export default function Home() {
  // const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");

  // const handleClick = async () => {
  //   const response = await getAIResponse(prompt);
  //   setResponse(response);
  // };

  return (
    <main
      className="min-h-screen bg-gray-100 
    flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Hello AI!
        </h1>
        <Chat />

        {/* Alternative approach by following this guide => https://www.youtube.com/watch?v=S5ZvC2FcqUY */}
        {/* <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleClick}>Get AI Response</button>
        <div>{response}</div> */}

        {/* <AiForm /> */}
      </div>
    </main>
  );
}
