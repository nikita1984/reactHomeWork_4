import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  // BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  componentWrapper: {
    width: "600px",
    height: "80vh",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
  },

  h3: {
    textAlign: "center",
  },
}));



function ChatList() {
  let match = useRouteMatch();

  const chats = [
    {id: "001", name: "First chat", mesages: []},
    {id: "002", name: "Second chat", mesages: []},
  ]; 

  const [chatsArray, setChatsArray] = useState(chats);

  return (
    <div>
      <h2>Список доступных чатов</h2>

      <ul>
        {chatsArray.map((chat) => (
          <li>
            <Link to={`${match.url}/${chat.id}`}>{chat.name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${match.path}/:chatId`}>
          <Chat />
        </Route>
        <Route path={match.path}>
          <h3>Выбери любой чат</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Chat() {
  const { chatId } = useParams();
  const [messagesArray, setMessagesArray] = useState([]);

  const classes = useStyles();

  const onSendMessage = (messageText) => {
    setMessagesArray((prev) => [
      ...prev,
      {
        messageText,
        author: "me",
      },
    ]);
  };

  // useEffect(() => {
  //   if (messagesArray.length > 0) {
  //     setTimeout(() => {
  //       console.log("Message was sent");
  //     }, 1000);
  //   }
  // }, [messagesArray]);

  return (<div>
      <div className={classes.chatWrapper}>
        <h3>Requested chat ID: {chatId}</h3>      
        <div>
          <h3 className={classes.h3}>name</h3>
          <div className={classes.componentWrapper}>
            <MessageList messagesArray={messagesArray} />
            <MessageInput onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
  </div>);
  ;
}


export default ChatList;