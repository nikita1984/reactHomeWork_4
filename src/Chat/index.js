// import React from "react";
import {
  // BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const chats = [
  {id: "001", name: "First chat", mesages: []},
  {id: "002", name: "Second chat", mesages: []},
]; 

function ChatList() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Список доступных чатов</h2>

      <ul>
        {chats.map((chat) => (
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
          <h3>Выбери чат</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Chat() {
  let { chatId } = useParams();
  return <h3>Requested chat ID: {chatId}</h3>;
}


export default ChatList;