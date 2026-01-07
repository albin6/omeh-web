import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { XCircle } from "lucide-react";

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
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`!h-12 !px-6 !rounded-2xl !font-semibold transition-all ${
        skipConfirmed
          ? "!bg-red-600 !border-red-600 !text-white hover:!bg-red-700"
          : "!bg-gray-700 !border-gray-600 !text-white hover:!bg-gray-600"
      }`}
      icon={<XCircle className="w-4 h-4" />}
    >
      {skipConfirmed ? "Confirm Skip" : "Skip"}
    </Button>
  );
};

export default SkipButton;
