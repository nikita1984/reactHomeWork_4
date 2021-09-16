import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatList from "./Chat";
import Playground from "./Playground";
import Home from "./Home";
import AppBar from "./AppBar";
import Profile from "./Profile";

const App = () => {
  return (
    <Router>
      <AppBar />

      <Switch>
          <Route path="/chat">
            <ChatList />
          </Route>

        <Route path="/playground">
          <Playground />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route>
          <h3>Page not found</h3>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
