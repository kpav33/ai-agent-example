"use client";
import { useEffect, useRef } from "react";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    // <div className="flex flex-col w-full max-w-md py-24 mx-auto">
    //   {messages.map((m) => (
    //     <div key={m.id} className="whitespace-pre-wrap">
    //       {m.role === "user" ? "User: " : "AI: "}
    //       {m.content}
    //     </div>
    //   ))}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
    //       value={input}
    //       placeholder="Say something..."
    //       onChange={handleInputChange}
    //     />
    //   </form>
    // </div>

    <div
    // className="flex flex-col w-full max-w-md py-6 mx-auto bg-gray-50 rounded-lg shadow-md"
    >
      <div className="overflow-y-auto max-h-96 p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-md whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <span className="font-medium">
              {m.role === "user" ? "User: " : "AI: "}
            </span>
            {m.content}
          </div>
        ))}
        {/* Invisible div to mark the end of messages */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </form>
    </div>
  );
}
