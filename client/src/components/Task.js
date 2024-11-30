import React, { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import io from "socket.io-client";
import Peer from "simple-peer";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const socket = io("http://localhost:8000/");

const CodeShare = () => {
  const [code, setCode] = useState("");
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState(
    "User" + Math.floor(Math.random() * 9999).toString()
  );
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState("");
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [callActive, setCallActive] = useState(false);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const userMessageRef = useRef();

  useEffect(() => {
    socket.emit("joinRoom", { room: roomID, username: username });

    socket.on("doc", (data) => {
      setCode(data.str);
    });

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: data.username, message: data.message },
      ]);
    });

    socket.on("user-connected", (userId) => {
      setMyId(userId);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("doc");
      socket.off("user-connected");
    };
  }, [roomID, username]);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
    socket.emit("codeChange", { room: roomID, code: value });
  };

  const sendMessage = () => {
    const message = userMessageRef.current.value;
    socket.emit("chatMessage", { message, username });
    userMessageRef.current.value = "";
  };

  const handleCall = () => {
    const peerInstance = new Peer({ initiator: true, trickle: false });
    setPeer(peerInstance);

    peerInstance.on("signal", (data) => {
      socket.emit("call", { to: peerId, from: myId, signalData: data });
    });

    peerInstance.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        peerInstance.addStream(stream);
      });
  };

  const handleAnswerCall = (signalData) => {
    const peerInstance = new Peer({ initiator: false, trickle: false });
    setPeer(peerInstance);

    peerInstance.on("signal", (data) => {
      socket.emit("answer", { to: myId, from: peerId, signalData: data });
    });

    peerInstance.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        peerInstance.addStream(stream);
      });

    peerInstance.signal(signalData);
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setCallActive(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <CodeMirror
            value={code}
            options={{
              mode: "javascript",
              lineNumbers: true,
              theme: "monokai",
            }}
            onBeforeChange={handleCodeChange}
          />
        </div>

        <div className="col-md-4">
          <div className="panel panel-primary">
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
                  <button
                    onClick={handleCall}
                    className="btn btn-sm btn-success"
                  >
                    Call
                  </button>
                </div>
              )}
            </div>
            <div className="panel-heading">
              CHAT ROOM
              <span className="pull-right">{username}</span>
            </div>
            <div
              className="panel-body"
              style={{ height: "200px", overflowY: "scroll" }}
            >
              <ul className="media-list" id="chatbox-listMessages">
                {messages.map((msg, idx) => (
                  <li className="media" key={idx}>
                    <div className="media-body">
                      <b>{msg.username}</b>: {msg.message}
                      <hr />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Message..."
                  ref={userMessageRef}
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary" onClick={sendMessage}>
                    Send
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" value={roomID} id="roomID" />
    </div>
  );
};

export default CodeShare;
