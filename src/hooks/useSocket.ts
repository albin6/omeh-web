import { useState, useEffect, useCallback } from "react";
import { initSocket, getSocket } from "../core/socket/socket";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    // Initialize socket connection
    setIsConnecting(true);
    const socketInstance = initSocket();

    // Set up connection listeners
    const handleConnect = () => {
      setIsConnected(true);
      setIsConnecting(false);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleConnectError = (error: any) => {
      setIsConnecting(false);
      console.error("Socket connection error:", error);
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);

    // Cleanup on unmount
    return () => {
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.off("connect_error", handleConnectError);
    };
  }, []);

  const reconnect = useCallback(() => {
    const currentSocket = getSocket();
    if (currentSocket) {
      currentSocket.connect();
    } else {
      initSocket();
      setIsConnecting(true);
    }
  }, []);

  return {
    socket: getSocket(),
    isConnected,
    isConnecting,
    reconnect,
  };
};

export default useSocket;
