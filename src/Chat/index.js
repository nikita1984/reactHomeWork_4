// import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function ChatList() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Список доступных чатов</h2>

      <ul>
        <li>
          <Link to={`${match.url}/chat1`}>First chat</Link>
        </li>
        <li>
          <Link to={`${match.url}/chat2`}>Second chat</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Выбери чат</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}


export default ChatList;