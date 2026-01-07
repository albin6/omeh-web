import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "antd/icons";

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

  const handleSend = (value?: string) => {
    const trimmed = (value ?? message).trim();
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
    <div className="flex gap-3 items-center w-full">
      <Input
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Connecting..." : "Type your message..."}
        disabled={disabled}
        className="!bg-gray-700 !border-gray-600 !text-white !rounded-2xl !px-5 !py-3 !h-12 placeholder:text-gray-400"
        style={{
          background: "#1f2937",
          borderColor: "#4b5563",
          color: "#f3f4f6",
        }}
      />
      <Button
        type="primary"
        onClick={() => handleSend()}
        disabled={disabled || !message.trim()}
        className="!bg-gradient-to-r !from-blue-600 !to-blue-700 !border-0 !h-12 !px-6 !rounded-2xl !font-semibold flex items-center gap-2"
        icon={<SendOutlined />}
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
