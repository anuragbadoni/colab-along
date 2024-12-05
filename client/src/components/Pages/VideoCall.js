// components/VideoCall.js
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from "../../socket/socket";

const VideoCall = ({
  myId,
  peerId1,
  callActive,
  setCallActive,
  peer,
  setPeer,
}) => {
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerId, setPeerId] = useState(null);

  useEffect(() => {
    if (peer) {
      peer.on("signal", (data) => {
        socket.emit("call", { to: peerId, from: myId, signalData: data });
      });

      peer.on("stream", (stream) => {
        remoteVideoRef.current.srcObject = stream;
      });
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [peer, myId, peerId]);

  const handleCall = () => {
    const newPeer = new Peer({ initiator: true, trickle: false });
    setPeer(newPeer);

    newPeer.on("signal", (data) => {
      socket.emit("call", { to: peerId, from: myId, signalData: data });
    });

    newPeer.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        newPeer.addStream(stream);
      });
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setCallActive(false);
    }
  };

  return (
    <div id="video-container">
      <video ref={videoRef} autoPlay muted style={{ width: "100%" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: "100%" }} />
      {callActive ? (
        <div id="step3">
          <p>
            Talking to <span>{peerId}</span>
            <button onClick={endCall} className="btn btn-sm btn-danger">
              End Call
            </button>
          </p>
        </div>
      ) : (
        <div id="step2">
          <p>Your ID: {myId}</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User ID to Call..."
            onChange={(e) => setPeerId(e.target.value)}
          />
          <button onClick={handleCall} className="btn btn-sm btn-success">
            Call
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
