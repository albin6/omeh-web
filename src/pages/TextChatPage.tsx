import React, { useEffect, useCallback } from "react";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import SkipButton from "../components/SkipButton";
import StatusBar from "../components/StatusBar";
import useChatSocket from "../hooks/useChatSocket";
import { Button, Space } from "antd";
import { Home, AlertCircle } from "lucide-react";

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
    <div className="h-[100dvh] w-full bg-[#0f172a] text-white overflow-hidden flex flex-col relative">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-6 gap-4">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between glass-panel p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Text Chat</h1>
              <p className="text-xs text-gray-400 mt-1">Anonymous & Secure</p>
            </div>
          </div>
          <Button
            type="text"
            className="!text-gray-400 hover:!text-white hover:!bg-white/10 rounded-xl"
            onClick={() => (window.location.href = "/")}
            icon={<Home className="w-4 h-4" />}
          >
            Exit
          </Button>
        </div>

        {/* Chat Area - Flex Grow to fill space */}
        <div className="flex-1 min-h-0 glass-panel rounded-3xl overflow-hidden flex flex-col relative border-white/5">
          <div className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-gradient-to-b from-[#1e293b] to-transparent">
            <StatusBar isSearching={isSearching} isConnected={isConnected} />
          </div>

          <div className="flex-1 overflow-hidden relative">
            <ChatWindow messages={messages} />

            {/* Partner Typing Indicator */}
            {isPartnerTyping && (
              <div className="absolute bottom-4 left-6 z-10 animate-slide-up">
                <div className="bg-gray-800/90 backdrop-blur text-xs px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </span>
                  <span className="text-gray-300">Stranger is typing...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="shrink-0 glass-panel p-4 rounded-2xl space-y-4">
          <MessageInput
            onSendMessage={sendMessage}
            onStartTyping={startTyping}
            onStopTyping={stopTyping}
            disabled={!isConnected || isSearching}
          />

          <div className="flex items-center justify-between px-1">
            <Space>
              {isSearching && !isConnected && (
                <Button
                  onClick={cancelSearch}
                  disabled={!isSearching || isConnected}
                  className="!bg-white/5 !border-white/10 !text-gray-300 hover:!bg-white/10 !rounded-xl"
                >
                  Cancel Search
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
                  className="!bg-blue-600 hover:!bg-blue-500 !border-0 !rounded-xl !h-10 !px-6 !font-semibold shadow-lg shadow-blue-500/20"
                >
                  Find New Partner
                </Button>
              )}
            </Space>
            <span className="hidden md:block text-xs text-gray-500">Press ESC to skip</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TextChatPage;
