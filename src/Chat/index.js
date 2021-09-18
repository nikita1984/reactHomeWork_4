import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  Redirect,
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

  const [chatsArray, setChatsArray] = useState([
    {id: "001", name: "First chat", mesages: []},
    {id: "002", name: "Second chat", mesages: []},
  ]);

  const onSendMessage = (messageText, chat) => {
    const chats = chatsArray.slice();
    const index = chats.indexOf(chat);
    chats[index].mesages.push(messageText);
    setChatsArray(chats);
  };

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
          <Chat onSendMessage={onSendMessage} chats={chatsArray}/>
        </Route>
        <Route path={match.path}>
          <h3>Выбери любой чат</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Chat(props) {
  const { chatId } = useParams();

  const classes = useStyles();

  // useEffect(() => {
  //   if (messagesArray.length > 0) {
  //     setTimeout(() => {
  //       console.log("Message was sent");
  //     }, 1000);
  //   }
  // }, [messagesArray]);

  const getChat = () => {
    for (let chat of props.chats) {
      if (chat.id === chatId){
        return chat;
      } 
    };
  };

  const chat = getChat();

  if (!chat) {
    return (<div>
      <h3>Указанный чат не найден.</h3>
      <h3>Выбери любой доступный чат</h3>
      </div> );
  }

  return (<div>
      <div className={classes.chatWrapper}>
        <div>
          <h3 className={classes.h3}>{chat.name}</h3>
          <div className={classes.componentWrapper}>
            <MessageList messagesArray={chat.mesages} />
            <MessageInput chat={chat} onSendMessage={props.onSendMessage} />
          </div>
        </div>
      </div>
  </div>);
  ;
}

export default ChatList;