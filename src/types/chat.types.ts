// Message interface
export interface Message {
  id: string;
  text: string;
  sender: 'self' | 'peer';
  timestamp: Date | string;
}

// Chat state interface
export interface ChatState {
  isConnected: boolean;
  isConnecting: boolean;
  isSearching: boolean;
  partnerConnected: boolean;
  isPartnerTyping: boolean;
  messages: Message[];
}

// Socket event enums
export enum SocketEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  MATCH_FOUND = 'match_found',
  WAITING = 'waiting',
  USER_DISCONNECTED = 'user_disconnected',
  START_SEARCH = 'start_search',
  STOP_SEARCH = 'stop_search',
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',
  SKIP_CHAT = 'skip_chat',
}

// Socket event payload interfaces
export interface MessagePayload {
  from: string;
  content: string;
  timestamp: Date | string;
}

export interface MatchFoundPayload {
  roomId: string;
}

export interface WaitingPayload {
  position: number;
}

export interface ConnectPayload {
  socketId: string;
}

export interface DisconnectPayload {
  reason: string;
}

export interface UserDisconnectedPayload {
  roomId: string;
}

export interface TypingPayload {
  isTyping: boolean;
}

export interface SkipChatPayload {
  reason?: string;
}