import React, { useState, useEffect } from "react";
import { XCircle, AlertTriangle } from "lucide-react";

interface SkipButtonProps {
  onSkip: () => void;
  disabled?: boolean;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  onSkip,
  disabled = false,
}) => {
  const [skipConfirmed, setSkipConfirmed] = useState(false);
  const [skipTimeout, setSkipTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleClick = () => {
    if (disabled) return;

    if (!skipConfirmed) {
      setSkipConfirmed(true);
      const timeout = setTimeout(() => {
        setSkipConfirmed(false);
      }, 3000);
      setSkipTimeout(timeout);
    } else {
      if (skipTimeout) {
        clearTimeout(skipTimeout);
      }
      onSkip();
      setSkipConfirmed(false);
    }
  };

  useEffect(() => {
    return () => {
      if (skipTimeout) {
        clearTimeout(skipTimeout);
      }
    };
  }, [skipTimeout]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative h-10 px-6 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300
        ${disabled
          ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5"
          : skipConfirmed
            ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse"
            : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
        }`}
    >
      {skipConfirmed ? <AlertTriangle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      <span>{skipConfirmed ? "Confirm?" : "Skip"}</span>
    </button>
  );
};

export default SkipButton;
