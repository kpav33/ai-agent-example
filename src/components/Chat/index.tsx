"use client";
import { useState, useEffect, useRef } from "react";

import { useChat } from "ai/react";

export default function Chat() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<string[]>([]);
  // Initial messages for the current chat
  // const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Create a separate chat instance for each chat ID
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      id: chatId || undefined, // Use chatId as the unique identifier for each chat
      initialMessages: [], // Start with empty messages
    });

  // Get chats from localStorage
  const getChatsFromLocalStorage = () => {
    const storedChats = localStorage.getItem("chatList");
    return storedChats ? JSON.parse(storedChats) : [];
  };

  // Save chats to localStorage
  const saveChatToLocalStorage = (id: string, messages: any) => {
    // console.log("saveChatToLocalStorage");
    // console.log(id, messages);
    localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
  };

  // Load a chat from localStorage
  const loadChatFromLocalStorage = (id: string) => {
    const chat = localStorage.getItem(`chat_${id}`);
    return chat ? JSON.parse(chat) : [];
  };

  // Initialize chat list from localStorage
  useEffect(() => {
    const chats = getChatsFromLocalStorage();
    setChatList(chats);
    if (chats.length > 0) {
      // Load the first chat by default
      const firstChat = chats[0];

      // Load messages from localStorage and update the chat
      const savedMessages = loadChatFromLocalStorage(firstChat);
      setMessages(savedMessages);
    }
  }, []);

  // Save current chat when messages change
  useEffect(() => {
    if (chatId && messages.length > 0) {
      saveChatToLocalStorage(chatId, messages);
    }
  }, [messages, chatId]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Create a new chat
  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    setChatId(newChatId);
    setChatList((prev) => {
      const updatedChats = [newChatId, ...prev];
      localStorage.setItem("chatList", JSON.stringify(updatedChats));
      return updatedChats;
    });

    setMessages([]); // Clear messages for new chat
  };

  // Switch to an existing chat
  const switchChat = (id: string) => {
    setChatId(id);

    // Load the selected chat's messages
    const savedMessages = loadChatFromLocalStorage(id);
    setMessages(savedMessages);
  };

  // Automatically create a new chat if no chat is active
  const handleInputChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!chatId) {
      const newChatId = `chat_${Date.now()}`;
      setChatId(newChatId);
      setChatList((prev) => {
        const updatedChats = [newChatId, ...prev];
        localStorage.setItem("chatList", JSON.stringify(updatedChats));
        return updatedChats;
      });
    }
    // Keep the original functionality
    handleInputChange(e);
  };

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
      {/* Chat Selector */}
      <div className="flex items-center justify-between p-4 border-b">
        <select
          value={chatId || ""}
          onChange={(e) => switchChat(e.target.value)}
          className="p-2 border rounded"
        >
          {chatList.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <button
          onClick={createNewChat}
          className="px-4 py-2 ml-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          New Chat
        </button>
      </div>

      {/* Messages */}
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

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          placeholder="Say something..."
          // onChange={handleInputChange}
          onChange={handleInputChangeWrapper}
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
