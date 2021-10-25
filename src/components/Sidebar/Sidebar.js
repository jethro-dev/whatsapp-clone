import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import "./Sidebar.scss";
import { SidebarChat } from "..";
import db from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useStateValue } from "../../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const getRoomsData = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setRooms(data);
  };

  useEffect(() => {
    getRoomsData();
    console.log("useeffect");
  }, []);

  useEffect(() => {
    console.log("rooms update");
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat addNewChat getRoomsData={getRoomsData} />
        {rooms.map((room) => {
          return (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
