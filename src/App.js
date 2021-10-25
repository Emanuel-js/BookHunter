import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";
import Detail from './pages/detail';
import Home from './pages/home';
import Books from './pages/books';
import Search from './pages/search';
import Register from './pages/auth/register';
import notfoundPage from './pages/notfoundPage';
import AuthContextProvider, { useAuth } from './contexts/AuthContext';
import myFav from './pages/myFav';
import nowReding from './pages/nowReding';


const App = () => {

    function ProtectedRoute(props) {
        const { currentUser } = useAuth()
        const { path } = props
        console.log('path', path)
        const location = useLocation()
        console.log('location state', location.state)
      
        if (
          path === '/register' 
    
        ) {
          return currentUser ? (
            <Redirect to={location.state?.from ?? '/'} />
          ) : (
            <Route {...props} />
          )
        }
        return currentUser ? (
          <Route {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/register',
              state: { from: path },
            }}
          />
        )
      }
    return (
    <AuthContextProvider>
         <Router>
            <div>
                
                    <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/detail" exact component={Detail}/>
                    <Route  path="/book" exact component={Books}/>
                    <Route path="/search" exact component={Search}/>
                    <ProtectedRoute path="/register" exact component={Register} />
                    <ProtectedRoute exact path='/myFav' component={myFav} />
                    <ProtectedRoute exact path='/reding' component={nowReding} />
                    <Route exact path='*' component={notfoundPage} />

                 </Switch>
            </div>
        </Router>
    </AuthContextProvider>
    )
}
 
export default App;