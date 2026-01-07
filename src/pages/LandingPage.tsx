import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { MessageCircle, Video } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTextChat = () => {
    navigate("/text");
  };

  const handleVideoChat = () => {
    navigate("/video");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Welcome
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 text-transparent bg-clip-text">
            Omegle Clone
          </h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
            Connect with strangers around the world in real-time. Chat, share,
            and make new friends instantly.
          </p>
        </div>

        {/* Chat Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
          {/* Text Chat Card */}
          <div
            className="group relative animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900 border-0 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Text Chat
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Start a conversation with a random stranger
                  </p>
                </div>
                <Button
                  type="primary"
                  onClick={handleTextChat}
                  size="large"
                  className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !border-0 !h-10 !px-8 !text-base font-semibold"
                >
                  Start Chatting
                </Button>
              </div>
            </div>
          </div>

          {/* Video Chat Card */}
          <div
            className="group relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900 border-0 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Video Chat
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Connect via video with someone new
                  </p>
                  <p className="text-xs text-gray-500 italic">Coming soon</p>
                </div>
                <Button
                  onClick={handleVideoChat}
                  size="large"
                  className="!bg-gray-800 !border-gray-700 !text-gray-300 !h-10 !px-8 !text-base font-semibold"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div
          className="mt-16 text-center text-gray-400 text-sm animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <p>✨ Safe, Anonymous, and Instant Connections ✨</p>
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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
