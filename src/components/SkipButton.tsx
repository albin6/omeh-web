import React, { useState, useEffect } from "react";

interface SkipButtonProps {
  onSkip: () => void;
  disabled?: boolean;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  onSkip,
  disabled = false,
}) => {
  const [skipConfirmed, setSkipConfirmed] = useState(false);
  const [skipTimeout, setSkipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (disabled) return;

    if (!skipConfirmed) {
      // First click: show "Really?" button
      setSkipConfirmed(true);

      // Set timeout to reset after 3 seconds
      const timeout = setTimeout(() => {
        setSkipConfirmed(false);
      }, 3000);

      setSkipTimeout(timeout);
    } else {
      // Second click: skip the chat
      if (skipTimeout) {
        clearTimeout(skipTimeout);
      }
      onSkip();
      setSkipConfirmed(false);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (skipTimeout) {
        clearTimeout(skipTimeout);
      }
    };
  }, [skipTimeout]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`skip-button ${skipConfirmed ? "confirmed" : ""}`}
    >
      {skipConfirmed ? "Really?" : "Skip"}
    </button>
  );
};

export default SkipButton;
