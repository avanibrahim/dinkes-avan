import React from "react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  type: "question" | "answer";
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, text }) => {
  return (
    <div
      className={cn(
        "max-w-[80%] px-4 py-2 rounded-xl text-sm sm:text-base shadow-sm",
        type === "question"
          ? "bg-gray-200 text-gray-800 self-start"
          : "bg-tealCustom text-white self-end"
      )}
    >
      {text}
    </div>
  );
};

export default ChatBubble;
