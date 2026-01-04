import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';

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
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (onStopTyping) {
        onStopTyping();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && onSendMessage && !disabled) {
        onSendMessage(message.trim());
        setMessage('');
        if (onStopTyping) {
          onStopTyping();
        }
      }
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
      }, 1000); // Stop typing indicator after 1 second of inactivity
    } else if (onStopTyping) {
      // If input is empty, stop typing immediately
      onStopTyping();
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Connecting..." : "Type your message..."}
        disabled={disabled}
        className="message-input"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="send-button"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;