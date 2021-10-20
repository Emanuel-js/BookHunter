import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Detail from './pages/detail';
import Home from './pages/home';
import Header from './pages/commen/header';
import Books from './pages/books';
import Search from './pages/search';

const App = () => {

    return (
        <div>
            <Router>
                <div>
                    <Header/>
                    <Switch>
                    <Route path="/" exact >
                        <Home />
                    </Route>
              
                    <Route path="/detail" exact>
                        <Detail/>
                    </Route>
                    
                    <Route path="/book" exact>
                        <Books/>
                        </Route>
                        <Route path="/search" exact>
                        <Search/>
                    </Route>
                 </Switch>
            </div>

            
            </Router>
        </div>
    )
}
 
export default App;