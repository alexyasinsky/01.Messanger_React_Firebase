
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

import moment from "moment";
import {useCallback, useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import {useParams, Navigate} from "react-router-dom";

import "./Messages.scss";


export default function Messages ({user, buddies}) {

  let initMessages = {};
  buddies.forEach(buddy => {
    Object.assign(initMessages, {[buddy.name] : []})
  })


  const {buddy} = useParams();

  let [messages, setMessages] = useState(initMessages);

  const addMessage = useCallback((newMessage) => {
    setMessages({...messages, [buddy]: [...messages[buddy], newMessage]});
  }, [buddy, messages]);

  useEffect(() => {
    let dialog = messages[buddy];
    let timerId = null;
    if (dialog) {
      if (dialog.length !==0 && !(dialog[dialog.length - 1].author === buddy)) {
        timerId = setTimeout(() => {
          let message = {
            date: moment().format('LTS'),
            author: buddy,
            text: `${dialog[dialog.length - 1].text}?`
          };
          addMessage(message);
        }, 1500);
      }
    }

    return () => clearTimeout(timerId);
  }, [messages, addMessage, buddy]);
  
  if (!messages[buddy]) {
    return <Navigate replace to='/chats' />
  }

  return (
    <Grid container direction="column" rowSpacing={4}>
      <Grid item xs>
        <Paper elevation={3} className='messages__area'>
          <div className='messages__list'>
            <MessageList
              messages={messages[buddy]}
              user={user}
            />
          </div>
        </Paper>
      </Grid>
      <Grid item xs>
        <MessageForm addMessage={addMessage} user={user}/>
      </Grid>
    </Grid>
    
  )
}