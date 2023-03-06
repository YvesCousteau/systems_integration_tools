import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import socketio from "socket.io-client";
import "./CallScreen.css";

function CallScreen() {
    const params = useParams();
    const localUsername = params.username;
    const roomName = params.room;
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const socket = socketio("https://signaling-server-flask.herokuapp.com/", {
        autoConnect: false,
    });
    let pc:any; // For RTCPeerConnection Object

    const sendData = (data:any) => {
        socket.emit("data", {
        username: localUsername,
        room: roomName,
        data: data,
        });
    };

    const startConnection = () => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { height: 350, width: 350 },
        }).then((stream) => {
            console.log("Local Stream found");
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;
            socket.connect();
            socket.emit("join", { username: localUsername, room: roomName });
        }).catch((error) => {
            console.error("Stream not found: ", error);
        });
    };
    const onIceCandidate = (event:any) => {
        if (event.candidate) {
            console.log("Sending ICE candidate");
            sendData({
                type: "candidate",
                candidate: event.candidate,
            });
        }
    };
    
    const onTrack = (event:any) => {
        console.log("Adding remote track");
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };
    
    const createPeerConnection = () => {
        try {
            pc = new RTCPeerConnection({});
            pc.onicecandidate = onIceCandidate;
            pc.ontrack = onTrack;
            if (localVideoRef.current) {
                const localStream:any = localVideoRef.current.srcObject;
                if (localStream) {
                    for (const track of localStream.getTracks()) {
                        pc.addTrack(track, localStream);
                    }
                }
            }
            console.log("PeerConnection created");
        } catch (error) {
            console.error("PeerConnection failed: ", error);
        }
    };

    const setAndSendLocalDescription = (sessionDescription:any) => {
        pc.setLocalDescription(sessionDescription);
        console.log("Local description set");
        sendData(sessionDescription);
    };
    
    const sendOffer = () => {
        console.log("Sending offer");
        pc.createOffer().then(setAndSendLocalDescription, (error:any) => {
            console.error("Send offer failed: ", error);
        });
    };
    
    const sendAnswer = () => {
        console.log("Sending answer");
        pc.createAnswer().then(setAndSendLocalDescription, (error:any) => {
            console.error("Send answer failed: ", error);
        });
    };
    const signalingDataHandler = (data:any) => {
        if (data.type === "offer") {
            createPeerConnection();
            pc.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
        } else if (data.type === "answer") {
            pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.type === "candidate") {
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } else {
            console.log("Unknown Data");
        }
    };
    socket.on("ready", () => {
        console.log("Ready to Connect!");
        createPeerConnection();
        sendOffer();
    });
    
      socket.on("data", (data) => {
        console.log("Data received: ", data);
        signalingDataHandler(data);
    });
    
    useEffect(() => {
        startConnection();
        return function cleanup() {
            pc?.close();
        };
    }, []);
    
	return (
    <div>
      <label>{"Username: " + localUsername}</label>
      <label>{"Room Id: " + roomName}</label>
      <video autoPlay muted playsInline ref={localVideoRef} />
      <video autoPlay muted playsInline ref={remoteVideoRef} />
    </div>
  );
}

export default CallScreen;