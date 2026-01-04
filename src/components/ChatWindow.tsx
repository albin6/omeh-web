import React, { useEffect, useRef } from 'react';
import type { Message } from '../types/chat.types';

interface ChatWindowProps {
  messages?: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages = []
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Waiting for a chat partner...</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'self' ? 'user' : 'partner'}`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {(message.timestamp instanceof Date
                  ? message.timestamp
                  : new Date(message.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;