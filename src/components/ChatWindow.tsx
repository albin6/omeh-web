import React, { useEffect, useRef } from "react";
import type { Message } from "../types/chat.types";
import { User, MessageSquare } from "lucide-react";

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
    <div className="h-full w-full overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-y-auto w-full px-4 py-6 space-y-6" id="chat-scroller">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4 opacity-50 select-none">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
              <MessageSquare className="w-10 h-10" />
            </div>
            <p className="text-lg font-medium">Waiting for a partner...</p>
          </div>
        ) : (
          messages.map((message) => {
            const isSelf = message.sender === "self";
            return (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${isSelf ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {!isSelf && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] md:max-w-[70%] px-5 py-3 shadow-sm ${isSelf
                      ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl rounded-tr-none"
                      : "bg-[#1e293b] text-gray-100 border border-white/5 rounded-2xl rounded-tl-none"
                    }`}
                >
                  <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <div
                    className={`text-[10px] mt-1.5 opacity-60 ${isSelf ? "text-purple-100 text-right" : "text-gray-400 text-left"
                      }`}
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

                {isSelf && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <style>{`
        #chat-scroller::-webkit-scrollbar {
          width: 6px;
        }
        #chat-scroller::-webkit-scrollbar-track {
          background: transparent;
        }
        #chat-scroller::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 99px;
        }
        #chat-scroller::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
