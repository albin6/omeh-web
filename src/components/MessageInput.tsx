import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
  onStartTyping?: () => void;
  onStopTyping?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onStartTyping,
  onStopTyping,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed && onSendMessage && !disabled) {
      onSendMessage(trimmed);
      setMessage("");
      if (onStopTyping) {
        onStopTyping();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Notify typing start
    if (value.trim() && onStartTyping) {
      onStartTyping();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing after user stops typing
    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        if (onStopTyping) {
          onStopTyping();
        }
      }, 1000);
    } else if (onStopTyping) {
      onStopTyping();
    }
  };

  return (
    <div className="relative flex items-center w-full gap-2">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Finding someone..." : "Type your message..."}
        disabled={disabled}
        className={`w-full bg-[#1e293b] text-white border-0 rounded-full px-6 py-4 pr-14 outline-none transition-all duration-300 placeholder:text-gray-500
          ${disabled
            ? "opacity-60 cursor-not-allowed bg-gray-800"
            : "hover:bg-[#273549] focus:bg-[#273549] focus:ring-2 focus:ring-blue-500/50 shadow-inner"
          }`}
      />

      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className={`absolute right-2 p-2.5 rounded-full flex items-center justify-center transition-all duration-300
          ${disabled || !message.trim()
            ? "bg-transparent text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95"
          }`}
      >
        <Send className={`w-5 h-5 ${!disabled && message.trim() ? "translate-x-0.5" : ""}`} />
      </button>
    </div>
  );
};

export default MessageInput;
