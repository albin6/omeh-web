import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";

const VideoChatPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full text-center relative z-10 bg-gray-800 border-gray-700 shadow-2xl rounded-2xl">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎥</div>
          <h1 className="text-3xl font-bold text-white mb-2">Video Chat</h1>
        </div>
        <p className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text font-semibold mb-4">
          Coming Soon!
        </p>
        <p className="text-gray-300 mb-8">
          We're working hard to bring you video chat functionality with
          crystal-clear quality and smooth performance.
        </p>
        <div className="flex gap-3 flex-col">
          <Button
            type="primary"
            onClick={handleGoBack}
            size="large"
            className="!bg-gradient-to-r !from-blue-600 !to-blue-700 !border-0 !h-11 !rounded-xl !font-semibold"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default VideoChatPage;
