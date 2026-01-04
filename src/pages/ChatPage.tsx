import React, { useEffect, useCallback } from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import SkipButton from '../components/SkipButton';
import StatusBar from '../components/StatusBar';
import useChatSocket from '../hooks/useChatSocket';
import '../styles/app.css';

const ChatPage: React.FC = () => {
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
    stopTyping
  } = useChatSocket();

  // Handle ESC key for skipping
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isConnected && !isSearching) {
      skipChat();
    }
  }, [isConnected, isSearching, skipChat]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [handleKeyDown]);

  // Start searching for a partner when the component mounts
  useEffect(() => {
    startSearch();
  }, [startSearch]);

  // When user gets disconnected from a chat, they should already be in searching state
  // The New Chat button allows them to explicitly start a new search

  return (
    <div className="chat-page">
      <StatusBar
        isSearching={isSearching}
        isConnected={isConnected}
      />

      {isPartnerTyping && (
        <div className="typing-indicator">
          Partner is typing...
        </div>
      )}
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <div className="input-container">
          <MessageInput
            onSendMessage={sendMessage}
            onStartTyping={startTyping}
            onStopTyping={stopTyping}
            disabled={!isConnected || isSearching}
          />
          {isSearching && !isConnected && (
            <button
              onClick={cancelSearch}
              className="cancel-button"
              disabled={!isSearching || isConnected}
            >
              Cancel
            </button>
          )}
          {isConnected && !isSearching && (
            <SkipButton onSkip={skipChat} disabled={!isConnected || isSearching} />
          )}
          {!isConnected && !isSearching && (
            <button
              onClick={startSearch}
              className="new-chat-button"
              disabled={isConnected || isSearching}
            >
              New Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;