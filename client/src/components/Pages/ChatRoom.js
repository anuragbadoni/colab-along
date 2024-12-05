// components/ChatRoom.js
import React, { useRef } from "react";

const ChatRoom = ({ messages, sendMessage, userMessageRef, username }) => {
  return (
    <div className="panel panel-primary">
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
  );
};

export default ChatRoom;
