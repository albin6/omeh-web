import React from "react";
import { Wifi, Loader2, VideoOff } from "lucide-react";

interface StatusBarProps {
  isConnected?: boolean;
  isSearching?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isConnected = false,
  isSearching = false,
}) => {
  if (isSearching) {
    return (
      <div className="flex items-center justify-center gap-2 text-yellow-400 font-medium text-sm animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Searching for someone...</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center justify-center gap-2 text-green-400 font-medium text-sm">
        <Wifi className="w-4 h-4" />
        <span>Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 font-medium text-sm">
      <VideoOff className="w-4 h-4 opacity-50" />
      <span>Disconnected</span>
    </div>
  );
};

export default StatusBar;
