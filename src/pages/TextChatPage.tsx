import React, { useEffect, useCallback } from "react";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import SkipButton from "../components/SkipButton";
import StatusBar from "../components/StatusBar";
import useChatSocket from "../hooks/useChatSocket";
import { Button, Space } from "antd";
import { Home } from "lucide-react";

const TextChatPage: React.FC = () => {
  const {
    messages,
    isSearching,
    isConnected,
    isPartnerTyping,
    sendMessage,
    startSearch,
    skipChat,
    cancelSearch,
    startTyping,
    stopTyping,
  } = useChatSocket();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isConnected && !isSearching) {
        skipChat();
      }
    },
    [isConnected, isSearching, skipChat]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown as any);
    return () => {
      window.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Text Chat
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Connect with a stranger instantly
            </p>
          </div>
          <Button
            type="text"
            className="!text-gray-400 hover:!text-white"
            onClick={() => (window.location.href = "/")}
            icon={<Home className="w-5 h-5" />}
          >
            Home
          </Button>
        </div>

        <StatusBar isSearching={isSearching} isConnected={isConnected} />

        {isPartnerTyping && (
          <div className="mb-4 p-4 bg-gray-700 rounded-2xl border border-gray-600 flex items-center gap-3 animate-pulse">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-gray-300">Partner is typing...</span>
          </div>
        )}

        <div className="chat-container grid grid-rows-[1fr_auto] gap-6 h-[calc(100vh-280px)]">
          <ChatWindow messages={messages} />

          <div className="input-area flex flex-col gap-4">
            <MessageInput
              onSendMessage={sendMessage}
              onStartTyping={startTyping}
              onStopTyping={stopTyping}
              disabled={!isConnected || isSearching}
            />

            <div className="flex items-center justify-between">
              <Space>
                {isSearching && !isConnected && (
                  <Button
                    onClick={cancelSearch}
                    disabled={!isSearching || isConnected}
                  >
                    Cancel
                  </Button>
                )}
                {isConnected && !isSearching && (
                  <SkipButton
                    onSkip={skipChat}
                    disabled={!isConnected || isSearching}
                  />
                )}
                {!isConnected && !isSearching && (
                  <Button
                    type="primary"
                    onClick={startSearch}
                    disabled={isConnected || isSearching}
                  >
                    New Chat
                  </Button>
                )}
              </Space>
              <span className="text-xs text-gray-500">Press ESC to skip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextChatPage;
