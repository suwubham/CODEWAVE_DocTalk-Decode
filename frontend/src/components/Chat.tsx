import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { ChatBubble } from "./ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "./ui/chat/chat-bubble";
import { ChatBubbleMessage } from "./ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import axios from "axios";

export const Chat = () => {
  const location = useLocation();
  const [message, setMessage] = useState(location.state || []);
  const [filMessage, setfilMessage] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const filteredMessages = message.splice(2).map((msg: any) => ({
      role: msg.role,
      text: msg.content[0].text,
    }));
    setfilMessage(filteredMessages);
  }, [message]);

  return (
    <div className="h-screen flex flex-col text-white">
      {/* Chat message list container */}
      <div className="flex-grow ml-4 overflow-auto">
        <ChatMessageList>
          {filMessage.map((msg: any, index: any) => (
            <ChatBubble
              key={index}
              variant={msg.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                fallback={msg.role === "user" ? "US" : "AI"}
                className="bg-white text-white"
              />
              <ChatBubbleMessage
                variant={msg.role === "user" ? "sent" : "received"}
              >
                {msg.text}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>

      {/* Fixed form at the bottom */}
      <div className="sticky inset-x-0 bottom-0 bg-gray-700 p-3 w-full">
        <div className="relative w-full">
          <ChatInput
            placeholder="Type your message here..."
            className="text-white  border-2 w-full min-h-12 resize-none rounded-lg bg-gray-700 p-3 shadow-none focus-visible:ring-0"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="flex items-center p-3 pt-0 text-white">
            <Button
              size="sm"
              className="ml-auto gap-1.5"
              onClick={async () => {
                const response = await axios.post(
                  "http://127.0.0.1:8000/process",
                  {
                    body: text,
                    first: "0",
                  }
                );
                setMessage(response.data);
                setText("");
              }}
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
