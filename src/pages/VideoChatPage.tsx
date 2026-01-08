import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeft, Video } from "lucide-react";

const VideoChatPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a] text-white flex items-center justify-center p-6">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="glass-panel max-w-md w-full text-center relative z-10 p-8 rounded-3xl border border-white/10">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Video className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Video Chat</h1>

        <div className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-semibold mb-6 border border-yellow-400/20">
          IN DEVELOPMENT
        </div>

        <p className="text-gray-400 mb-8 leading-relaxed">
          We're working hard to bring you video chat functionality with
          crystal-clear quality and smooth performance.
        </p>

        <div className="flex gap-3 flex-col">
          <Button
            type="primary"
            onClick={handleGoBack}
            size="large"
            className="!bg-white !text-black !border-0 !h-12 !rounded-xl !font-bold hover:!bg-gray-200"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;
