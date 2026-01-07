import React, { useEffect, useRef } from "react";
import type { Message } from "../types/chat.types";
import { Empty, Avatar } from "antd";

interface ChatWindowProps {
  messages?: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages = [] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 h-[60vh] overflow-hidden flex flex-col shadow-2xl border border-gray-700">
      <div className="messages-container overflow-auto flex-1 space-y-4 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-30">💬</div>
              <Empty
                description={
                  <span className="text-gray-400 text-base">
                    Waiting for a chat partner...
                  </span>
                }
              />
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 max-w-full animate-fadeIn ${
                message.sender === "self" ? "justify-end" : "justify-start"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {message.sender !== "self" && (
                <Avatar
                  size="small"
                  className="!bg-gradient-to-br !from-blue-500 !to-cyan-500 flex-shrink-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="text-white text-xs font-bold">P</span>
                </Avatar>
              )}
              <div
                className={`${
                  message.sender === "self"
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-3xl rounded-bl-none"
                } px-5 py-3 max-w-[70%] break-words shadow-lg`}
              >
                <div className="message-text text-sm leading-relaxed">
                  {message.text}
                </div>
                <div
                  className={`message-time text-xs ${
                    message.sender === "self"
                      ? "text-blue-100"
                      : "text-gray-400"
                  } mt-1.5 text-right opacity-70`}
                >
                  {(message.timestamp instanceof Date
                    ? message.timestamp
                    : new Date(message.timestamp)
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {message.sender === "self" && (
                <Avatar
                  size="small"
                  className="!bg-gradient-to-br !from-purple-500 !to-blue-500 flex-shrink-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="text-white text-xs font-bold">U</span>
                </Avatar>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
