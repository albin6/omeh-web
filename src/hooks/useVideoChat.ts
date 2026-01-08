import { useState, useEffect, useRef, useCallback } from "react";
import useSocket from "./useSocket";
import { SocketEvents } from "../types/chat.types";
import type { SignalPayload } from "../types/chat.types";

const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" },
    ],
};

const useVideoChat = () => {
    const { socket, isConnected: isSocketConnected } = useSocket();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false); // In a call
    const [isInitiator, setIsInitiator] = useState(false);

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    // Initialize Media Stream
    const initializeMedia = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);
            return stream;
        } catch (err) {
            console.error("Error accessing media devices:", err);
            // Handle error (e.g., notify user permissions denied)
            return null;
        }
    }, []);

    const createPeerConnection = useCallback(() => {
        if (peerConnection.current) return peerConnection.current;

        const pc = new RTCPeerConnection(ICE_SERVERS);

        pc.onicecandidate = (event) => {
            if (event.candidate && socket) {
                socket.emit(SocketEvents.SIGNAL_ICE_CANDIDATE, { candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        // Add local tracks
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            });
        }

        peerConnection.current = pc;
        return pc;
    }, [socket, localStream]);

    // Handle Match Found (Initiate or Wait)
    useEffect(() => {
        if (!socket) return;

        const handleVideoMatchFound = async (data: { roomId: string; initiator: boolean }) => {
            setIsSearching(false);
            setIsConnected(true);
            setIsInitiator(data.initiator);

            const pc = createPeerConnection();

            if (data.initiator) {
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    socket.emit(SocketEvents.SIGNAL_OFFER, { type: "offer", sdp: offer.sdp });
                } catch (err) {
                    console.error("Error creating offer:", err);
                }
            }
        };

        const handleSignalOffer = async (data: SignalPayload) => {
            if (!peerConnection.current) createPeerConnection(); // Ensure PC exists
            const pc = peerConnection.current!;

            try {
                if (!data.sdp) return;
                await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: data.sdp }));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.emit(SocketEvents.SIGNAL_ANSWER, { type: "answer", sdp: answer.sdp });
            } catch (err) {
                console.error("Error handling offer:", err);
            }
        };

        const handleSignalAnswer = async (data: SignalPayload) => {
            if (!peerConnection.current) return;
            try {
                if (!data.sdp) return;
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: data.sdp }));
            } catch (err) {
                console.error("Error handling answer:", err);
            }
        };

        const handleSignalIceCandidate = async (data: SignalPayload) => {
            if (!peerConnection.current) return;
            try {
                if (data.candidate) {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            } catch (err) {
                console.error("Error handling ICE candidate:", err);
            }
        };

        const handleUserDisconnected = () => {
            closePeerConnection();
            setIsConnected(false);
            // Maybe auto-search again? For now, just reset state.
        };

        socket.on(SocketEvents.VIDEO_MATCH_FOUND, handleVideoMatchFound);
        socket.on(SocketEvents.SIGNAL_OFFER, handleSignalOffer);
        socket.on(SocketEvents.SIGNAL_ANSWER, handleSignalAnswer);
        socket.on(SocketEvents.SIGNAL_ICE_CANDIDATE, handleSignalIceCandidate);
        socket.on(SocketEvents.USER_DISCONNECTED, handleUserDisconnected);

        return () => {
            socket.off(SocketEvents.VIDEO_MATCH_FOUND, handleVideoMatchFound);
            socket.off(SocketEvents.SIGNAL_OFFER, handleSignalOffer);
            socket.off(SocketEvents.SIGNAL_ANSWER, handleSignalAnswer);
            socket.off(SocketEvents.SIGNAL_ICE_CANDIDATE, handleSignalIceCandidate);
            socket.off(SocketEvents.USER_DISCONNECTED, handleUserDisconnected);
        };
    }, [socket, createPeerConnection]);

    // Cleanup
    const closePeerConnection = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setRemoteStream(null);
    };

    // Public Actions
    const startVideoSearch = async () => {
        if (!localStream) {
            await initializeMedia();
        }
        if (socket) {
            setIsSearching(true);
            socket.emit(SocketEvents.START_VIDEO_SEARCH);
        }
    };

    const stopVideoSearch = () => {
        if (socket) {
            socket.emit(SocketEvents.STOP_VIDEO_SEARCH);
        }
        setIsSearching(false);
    };

    const skipMatch = () => {
        if (socket) {
            socket.emit(SocketEvents.SKIP_CHAT);
        }
        closePeerConnection();
        setIsConnected(false);
        setIsSearching(false);
    };

    // Unmount cleanup
    useEffect(() => {
        return () => {
            closePeerConnection();
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []); // Only on unmount. Note: this might kill stream if component re-mounts aggressively.

    return {
        localStream,
        remoteStream,
        isSearching,
        isConnected,
        isSocketConnected,
        isInitiator,
        startVideoSearch,
        stopVideoSearch,
        skipMatch,
        initializeMedia
    };
};

export default useVideoChat;
