import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import {
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

  const createChat = () => {
    const newChatID = Math.floor(Math.random() * 10 ** 3).toString();
    const defaultChatName = 'New chat: ' + newChatID; 
    const newChatName = prompt('Введите имя чата!', defaultChatName);
    const newChat = {id: newChatID, name: newChatName, mesages: []};

    const chats = chatsArray.slice();
    chats.push(newChat);    
    setChatsArray(chats);
  };

  return (
    <div>
      <h2>Список доступных чатов</h2>

      <ul>
        {chatsArray.map((chat) => (
          <div>
            <li>
                <Link to={`${match.url}/${chat.id}`}>{chat.name}</Link>
            </li>
            <button data-id={chat.id} onClick={deleteChat}>удалить</button>
          </div>
        ))}
      </ul>

      <button onClick={createChat}>Новый чат</button>

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