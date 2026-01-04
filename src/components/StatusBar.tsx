import React from 'react';

interface StatusBarProps {
  isConnected?: boolean;
  isSearching?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isConnected = false,
  isSearching = false
}) => {
  const getStatusText = () => {
    if (isSearching) return 'Searching for partner...';
    if (isConnected) return 'Connected';
    return 'Disconnected';
  };

  const getStatusColor = () => {
    if (isSearching) return '#FFA500'; // Orange
    if (isConnected) return '#4CAF50'; // Green
    return '#F44336'; // Red
  };

  return (
    <div className="status-bar">
      <div
        className="status-indicator"
        style={{ backgroundColor: getStatusColor() }}
      />
      <span className="status-text">{getStatusText()}</span>
    </div>
  );
};

export default StatusBar;