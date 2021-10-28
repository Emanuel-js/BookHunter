import React,{useState} from 'react'
import './header.css';
import logo from '../../assets/img/logo.png';
import { Link,NavLink,useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Header() {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [type, setType] = useState('title');
    const {logout,currentUser } = useAuth();
    const handleSearch = () =>{ 
        let path = `/search`;
        // console.log(query);
        if (query == '') {
           return toast.warn("please provide a query", { hideProgressBar: true, autoClose: 1500, theme: 'dark' });
        }
       history.push({
          pathname: path,
          state: {  // location state
              query,
              type
          },
       });
        setQuery('');
    }
     
 
    
    return (
        <div className="header-container">
            <Link to="/"className="logo" >
                <img src={logo} alt="logo" />
            </Link>
            
                <ul className="menu" >
                    <NavLink exact to="/" activeClassName="active"><li>Home</li></NavLink>
                    <NavLink to="/book" activeClassName="active"><li>Books</li></NavLink>
                {currentUser && <NavLink to="/myFav" activeClassName="active"><li>MyFav</li></NavLink>}
                {currentUser && <NavLink to="/reding" activeClassName="active"><li>NowReading</li></NavLink>}

                </ul>
            
           <ToastContainer/>

            <div className="search-form ">
                <input type="search" value={query} onChange={(e)=>  setQuery(e.target.value) }/>

                <div className="dropdown">
                    <button onClick={handleSearch} className="btn btn-prim" >search 🔽</button>
            
                    <select value={type} onChange={(e)=>setType(e.target.value)} className="dropdown-content">
                        <option value="title">title</option>
                        <option value="author">author</option>
                    </select>
                </div>
            </div>

        {
                currentUser === null ? <Link to="/register"> <button className="btn btn-sec">register</button></Link> :
                <Link to="/register"> <button className="btn btn-sec" onClick={logout}>Logout</button></Link>

        
        }
        </div>
    )
}

export default Header;
