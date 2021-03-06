
import {Grid} from "@mui/material";
import { Outlet } from 'react-router-dom';
import ChatList from "./components/ChatList/ChatList";

export default function Chats () {
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <ChatList/>
      </Grid>
      <Grid item xs>
        <Outlet/>
      </Grid>
    </Grid>
  )
}

