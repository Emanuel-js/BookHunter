import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import Detail from "./pages/detail";
import Home from "./pages/home";
import Books from "./pages/books";
import Search from "./pages/search";
import Register from "./pages/auth/register";
import notfoundPage from "./pages/notfoundPage";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";
import myFav from "./pages/myFav";
import nowReding from "./pages/nowReding";
import Library from "./pages/library";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {

  // to protect the route 
  function ProtectedRoute(props) {
    const { currentUser } = useAuth();
    const { path } = props;

    const location = useLocation();

    if (path === "/register") {
      return currentUser ? (
        <Redirect to={location.state?.from ?? path} />
      ) : (
        <Route {...props} />
      );
    }
    return currentUser ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/register",
          state: { from: path },
        }}
      />
    );
  }
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/book" exact component={Books} />
            <Route path="/search" exact component={Search} />
            <ProtectedRoute path="/register" exact component={Register} />
            <ProtectedRoute exact path="/myFav" component={myFav} />
            <ProtectedRoute exact path="/reding" component={nowReding} />
            <ProtectedRoute exact path="/library" component={Library} />
            <Route exact path="*" component={notfoundPage} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
