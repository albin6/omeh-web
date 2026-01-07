import React from "react";
import { Tag, Space } from "antd";
import { Wifi, Loader } from "lucide-react";

interface StatusBarProps {
  isConnected?: boolean;
  isSearching?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isConnected = false,
  isSearching = false,
}) => {
  const getStatusText = () => {
    if (isSearching) return "Searching for partner...";
    if (isConnected) return "Connected";
    return "Disconnected";
  };

  const getTagColor = () => {
    if (isSearching) return "orange";
    if (isConnected) return "success";
    return "error";
  };

  return (
    <div className="status-bar w-full mb-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg">
        <Space size="large">
          <div className="flex items-center gap-3">
            {isSearching && (
              <Loader className="w-5 h-5 text-orange-400 animate-spin" />
            )}
            {isConnected && (
              <Wifi className="w-5 h-5 text-green-400 animate-pulse" />
            )}
            {!isConnected && !isSearching && (
              <Wifi className="w-5 h-5 text-red-400 opacity-50" />
            )}
            <Tag color={getTagColor()} className="!m-0 !font-semibold">
              {getStatusText()}
            </Tag>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default StatusBar;
