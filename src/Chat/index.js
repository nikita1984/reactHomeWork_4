import React, { useState } from "react";
import Chat from "./Chat";
import Button from "@material-ui/core/Button";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.dark,
    textDecoration: "none",
  },

  activeLink: {
    color: "red",
  },

  chatList: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },

  deleteButton: {
    height: "5px",
  },
}));

function ChatList() {
  let match = useRouteMatch();
  const classes = useStyles();

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

  const getChat = (id) => {
    const chats = chatsArray.slice();
    for (let chat of chats) {
      if (chat.id === id){
        return chat;
      } 
    };
  };

  const deleteChat = (event) => {
    const deletedChatID = event.target.dataset.id;
    const deletedChats = getChat(deletedChatID);

    const chats = chatsArray.slice();
    const index = chats.indexOf(deletedChats);
    chats.splice(index, 1);
    setChatsArray(chats);
  };

  const getNewChatList = (newChatID) => {
    const defaultChatName = 'New chat: ' + newChatID; 
    const newChatName = prompt('Введите имя чата!', defaultChatName);
    const newChat = {id: newChatID, name: newChatName, mesages: []};

    const chats = chatsArray.slice();
    chats.push(newChat);    
    setChatsArray(chats);
  };
  const isUnique = (newChatID) => {
    const chats = chatsArray.slice();
    for (let chat of chats) {
      if (chat.id === newChatID){
        return false;
      } 
    };
    return true;
  };
  const createChat = () => {
    const newChatID = Math.floor(Math.random() * 10 ** 3).toString();
    if (isUnique) {
      getNewChatList(newChatID);
    } else {
      const newChatID = Math.floor(Math.random() * 10 ** 4).toString();
      getNewChatList(newChatID);
    }
  };

  return (
    <div className={classes.chatList}> 
      <h2>Список доступных чатов</h2>

      <ul>
        {chatsArray.map((chat) => (
          <div>
            <li>
                <Link to={`${match.url}/${chat.id}`} className={classes.link}>{chat.name}</Link>
            </li>
            <Button
            variant="contained"
            color="primary"
            data-id={chat.id}
            onClick={deleteChat}
            classes={{
              root: classes.deleteButton,
            }}
            >
              delete
          </Button>
          </div>
        ))}
      </ul>

      <Button
        variant="contained"
        color="primary"
        onClick={createChat}
        classes={{
          root: classes.button,
        }}
      >
        Новый чат
      </Button>

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

export default ChatList;