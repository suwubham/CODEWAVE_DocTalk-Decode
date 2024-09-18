import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { ChatBubble } from "./ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "./ui/chat/chat-bubble";
import { ChatBubbleMessage } from "./ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";

export const Chat = () => {
  const location = useLocation();
  const [message, setMessage] = useState(location.state.splice(2) || []);
  const filteredMessages = message.map((msg: any) => ({
    role: msg.role,
    text: msg.content[0].text,
  }));
  return (
    <div className="h-screen text-white">
      <ChatMessageList>
        {filteredMessages.map((msg: any, index: any) => (
          <ChatBubble
            key={index}
            variant={msg.role === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar fallback={msg.role === "user" ? "US" : "AI"} className="bg-white text-black"/>
            <ChatBubbleMessage
              variant={msg.role === "user" ? "sent" : "received"}
            >
              {msg.text}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
      </ChatMessageList>
      <form className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1 w-full">
        <ChatInput
          placeholder="Type your message here..."
          className="text-black min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0 w-full"
        />
        <div className="flex items-center p-3 pt-0 text-black">
          <Button size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
