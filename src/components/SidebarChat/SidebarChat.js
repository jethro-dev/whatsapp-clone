import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.scss";
import db from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, id, name, getRoomsData }) => {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const unsub = onSnapshot(
        query(
          collection(db, `rooms/${id}/messages`),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          console.log(snapshot.docs[0].data().message);
          setMessage(snapshot.docs[0].data().message);
        }
      );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("please enter name for chat room");

    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,
      }).then((res) => getRoomsData());
    }
  };

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 5000);
    setSeed(randomNum);
  }, []);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="chat-info">
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar-chat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
