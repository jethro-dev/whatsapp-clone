import React, { useState, useEffect } from "react";
import "./Chat.scss";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  SearchOutlined,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  addDoc,
  getDocs,
  getDoc,
  collection,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const getRoomsData = async () => {
    const querySnapshot = await getDoc(doc(db, `rooms/${roomId}`));
    setRoomName(querySnapshot.data().name);
  };

  const getMessagesData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp"))
    );
    setMessages(querySnapshot.docs.map((doc) => doc.data()));
  };

  const addMessage = () => {
    addDoc(collection(db, `rooms/${roomId}/messages`), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    }).then((res) => getMessagesData());
  };

  useEffect(() => {
    if (roomId) {
      getRoomsData();
      getMessagesData();
    }
  }, [roomId]);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 5000);
    setSeed(randomNum);
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    addMessage();
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="header-info">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((message) => (
          <p
            className={`message ${
              message.name === user.displayName && `reciever`
            }`}
          >
            {message.message}
            <span className="message-timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>

        <IconButton>
          <AttachFile />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={handleChange}
          />
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
