import { useState, useEffect, useCallback } from 'react';
import type { Message, MessagePayload, MatchFoundPayload, WaitingPayload } from '../types/chat.types';
import { SocketEvents } from '../types/chat.types';
import useSocket from './useSocket';

interface UseChatSocketReturn {
  messages: Message[];
  isSearching: boolean;
  isConnected: boolean;
  isPartnerTyping: boolean;
  sendMessage: (text: string) => void;
  startSearch: () => void;
  stopSearch: () => void;
  skipChat: () => void;
  startTyping: () => void;
  stopTyping: () => void;
}

const useChatSocket = (): UseChatSocketReturn => {
  const { socket, isConnected: isSocketConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [isChatConnected, setIsChatConnected] = useState(false); // Connected to a chat partner

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: MessagePayload) => {
      // Ensure timestamp is converted to Date object if it's a string
      const timestamp = data.timestamp instanceof Date
        ? data.timestamp
        : new Date(data.timestamp || Date.now());

      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.content,
        sender: 'peer', // Messages from backend are from the peer
        timestamp,
      };
      setMessages(prev => [...prev, newMessage]);
    };

    const handleMatchFound = (_data: MatchFoundPayload) => {
      setIsSearching(false);
      setIsChatConnected(true);
    };

    const handleWaiting = (_data: WaitingPayload) => {
      setIsSearching(true);
      setIsChatConnected(false);
    };

    const handleUserDisconnected = () => {
      // Clear messages and go to disconnected state (not searching)
      setMessages([]);
      setIsSearching(false);
      setIsChatConnected(false);
    };

    const handleTyping = (data: TypingPayload) => {
      setIsPartnerTyping(data.isTyping);
    };

    const handleSkip = () => {
      // Clear messages and go to disconnected state (not searching)
      setMessages([]);
      setIsSearching(false);
      setIsChatConnected(false);
    };

    // Clean up any existing listeners before adding new ones to prevent duplicates
    socket.off(SocketEvents.MESSAGE);
    socket.off(SocketEvents.MATCH_FOUND);
    socket.off(SocketEvents.WAITING);
    socket.off(SocketEvents.USER_DISCONNECTED);
    socket.off(SocketEvents.TYPING_START);
    socket.off(SocketEvents.TYPING_STOP);
    socket.off(SocketEvents.SKIP_CHAT);

    // Add event listeners
    socket.on(SocketEvents.MESSAGE, handleMessage);
    socket.on(SocketEvents.MATCH_FOUND, handleMatchFound);
    socket.on(SocketEvents.WAITING, handleWaiting);
    socket.on(SocketEvents.USER_DISCONNECTED, handleUserDisconnected);
    socket.on(SocketEvents.TYPING_START, handleTyping);
    socket.on(SocketEvents.TYPING_STOP, handleTyping);
    socket.on(SocketEvents.SKIP_CHAT, handleSkip);

    return () => {
      // Clean up event listeners when component unmounts or socket changes
      socket.off(SocketEvents.MESSAGE, handleMessage);
      socket.off(SocketEvents.MATCH_FOUND, handleMatchFound);
      socket.off(SocketEvents.WAITING, handleWaiting);
      socket.off(SocketEvents.USER_DISCONNECTED, handleUserDisconnected);
      socket.off(SocketEvents.TYPING_START, handleTyping);
      socket.off(SocketEvents.TYPING_STOP, handleTyping);
      socket.off(SocketEvents.SKIP_CHAT, handleSkip);
    };
  }, [socket]);

  // Update connection status based on socket connection
  useEffect(() => {
    if (isSocketConnected) {
      setIsSearching(true); // Show "Searching..." when socket connects
    } else {
      setIsSearching(false);
    }
  }, [isSocketConnected]);

  // Send message to backend
  const sendMessage = useCallback((text: string) => {
    if (socket && text.trim()) {
      const messageData: MessagePayload = {
        from: 'self',
        content: text.trim(),
        timestamp: new Date(),
      };

      socket.emit(SocketEvents.MESSAGE, messageData);

      // Add the sent message to the UI
      const newMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'self',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    }
  }, [socket]);

  // Start search for a partner
  const startSearch = useCallback(() => {
    if (socket) {
      setIsSearching(true);
      socket.emit(SocketEvents.START_SEARCH);
    }
  }, [socket]);

  // Stop search for a partner
  const stopSearch = useCallback(() => {
    if (socket) {
      setIsSearching(false);
      socket.emit(SocketEvents.STOP_SEARCH);
    }
  }, [socket]);

  // Skip current chat
  const skipChat = useCallback(() => {
    if (socket) {
      socket.emit(SocketEvents.SKIP_CHAT);
      // Go back to searching
      setIsSearching(true);
    }
  }, [socket]);

  // Cancel current search
  const cancelSearch = useCallback(() => {
    if (socket) {
      socket.emit(SocketEvents.STOP_SEARCH);
      setIsSearching(false);
      setMessages([]); // Clear any messages if any
    }
  }, [socket]);

  // Start typing indicator
  const startTyping = useCallback(() => {
    if (socket) {
      socket.emit(SocketEvents.TYPING_START, { isTyping: true });
    }
  }, [socket]);

  // Stop typing indicator
  const stopTyping = useCallback(() => {
    if (socket) {
      socket.emit(SocketEvents.TYPING_STOP, { isTyping: false });
    }
  }, [socket]);

  return {
    messages,
    isSearching,
    isConnected: isSocketConnected && isChatConnected,
    isPartnerTyping,
    sendMessage,
    startSearch,
    stopSearch,
    skipChat,
    cancelSearch,
    startTyping,
    stopTyping,
  };
};

export default useChatSocket;