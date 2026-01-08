import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { Home, Video, VideoOff, SkipForward, CameraOff } from "lucide-react";
import useVideoChat from "../hooks/useVideoChat";

const VideoChatPage: React.FC = () => {
    const {
        localStream,
        remoteStream,
        isSearching,
        isConnected,
        isSocketConnected,
        startVideoSearch,
        stopVideoSearch,
        skipMatch,
        initializeMedia
    } = useVideoChat();

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // Initial media setup
    useEffect(() => {
        initializeMedia();
    }, [initializeMedia]);

    // Bind streams to video elements
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div className="h-[100dvh] w-full bg-gray-900 flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                <Button
                    type="text"
                    className="!text-white hover:!bg-white/10"
                    onClick={() => (window.location.href = "/")}
                    icon={<Home className="w-5 h-5" />}
                >
                    Home
                </Button>
                <div className="px-4 py-2 rounded-full glass-panel text-sm font-medium text-white/80">
                    {isSocketConnected ? (
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Online
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Connecting...
                        </span>
                    )}
                </div>
            </div>

            {/* Main Video Area (Remote) */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
                {remoteStream && isConnected ? (
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-center text-white/50 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${isSearching ? 'bg-blue-500/20 animate-pulse' : 'bg-gray-800'}`}>
                            {isSearching ? <Video className="w-10 h-10 text-blue-400" /> : <VideoOff className="w-10 h-10" />}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {isSearching ? "Searching for partner..." : "Start video chat"}
                        </h3>
                        <p className="text-sm max-w-xs">
                            {isSearching ? "Please wait while we match you with someone." : "Click Start to meet new people instantly."}
                        </p>
                    </div>
                )}

                {/* Local Video (PIP) */}
                <div className="absolute bottom-24 right-4 w-32 md:w-48 aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 z-20">
                    {localStream ? (
                        <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover scale-x-[-1]"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                            <CameraOff className="w-6 h-6 text-white/50" />
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="h-20 glass-panel border-t border-white/10 flex items-center justify-center gap-6 px-4 z-50">
                {!isSearching && !isConnected ? (
                    <Button
                        type="primary"
                        size="large"
                        className="!h-12 !px-8 !rounded-full !bg-gradient-to-r !from-purple-600 !to-blue-600 !border-0 !text-base !font-bold shadow-lg shadow-purple-500/30 hover:!shadow-purple-500/50 transition-all"
                        onClick={startVideoSearch}
                    >
                        Start Video Chat
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        size="large"
                        className={`!h-12 !px-8 !rounded-full !border-0 !text-base !font-bold shadow-lg transition-all !bg-red-500 hover:!bg-red-600 shadow-red-500/30`}
                        onClick={isConnected ? skipMatch : stopVideoSearch}
                        icon={isConnected ? <SkipForward className="w-5 h-5" /> : null}
                    >
                        {isConnected ? "Skip Partner" : "Stop Search"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VideoChatPage;
