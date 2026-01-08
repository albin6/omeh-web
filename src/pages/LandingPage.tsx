import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { MessageCircle, Video, Shuffle } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTextChat = () => {
    navigate("/text");
  };

  const handleVideoChat = () => {
    navigate("/video");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Content Container */}
      <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-purple-200 border-purple-500/20 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Live & Anonymous
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4">
            Connect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Instantly</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience random connections like never before. 
            Safe, anonymous, and designed for genuine conversations.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Text Chat Card */}
          <div 
            onClick={handleTextChat}
            className="group relative cursor-pointer group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
             <div className="glass-panel relative rounded-3xl p-8 h-full flex flex-col items-center justify-center gap-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Text Chat</h3>
                    <p className="text-gray-400">Start a random text conversation</p>
                </div>
                <Button 
                    type="primary" 
                    size="large"
                    className="!bg-white !text-black !border-none !font-bold !h-12 !px-8 !rounded-xl group-hover:!scale-105 transition-transform"
                >
                    Start Chatting
                </Button>
             </div>
          </div>

          {/* Video Chat Card */}
          <div 
            onClick={handleVideoChat}
            className="group relative cursor-pointer"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
             <div className="glass-panel relative rounded-3xl p-8 h-full flex flex-col items-center justify-center gap-6 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <Video className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Video Chat</h3>
                    <p className="text-gray-400">Face-to-face connections</p>
                </div>
                 <Button 
                    size="large"
                    className="!bg-white/10 !text-white !border-white/10 !font-bold !h-12 !px-8 !rounded-xl backdrop-blur-md group-hover:!bg-white/20"
                >
                    Video Call
                </Button>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-gray-500 flex items-center gap-6">
            <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                <span>Random Matching</span>
            </div>
             <div className="w-1 h-1 bg-gray-700 rounded-full" />
             <div>100% Anonymous</div>
             <div className="w-1 h-1 bg-gray-700 rounded-full" />
             <div>No Login Required</div>
        </div>
      </div>
      
       <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
