import React,{useState} from 'react'
import './header.css';
import logo from '../../assets/img/logo.png';
import { Link,NavLink,useHistory } from 'react-router-dom';
function Header() {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [type,setType]=useState('title');
    const handleSearch = () =>{ 
        let path = `/search`;
        // console.log(query);
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
            
                <ul className="menu" activeClassName="active">
                    <NavLink exact to="/"activeClassName="active"><li>Home</li></NavLink>
                    <NavLink to="/book"activeClassName="active"><li>Books</li></NavLink>
                    <NavLink to="/myFav"activeClassName="active"><li>MyFav</li></NavLink>
                    <NavLink to="/reding"activeClassName="active"><li>NowReading</li></NavLink>
                    <NavLink to="/about" activeClassName="active"><li>AboutUs</li></NavLink>

                </ul>
            
           

            <div class="search-form ">
                <input type="search" value={query} onChange={(e)=>setQuery(e.target.value)}/>

                <div className="dropdown">
                    <button onClick={handleSearch} className="btn btn-prim" >search 🔽</button>
            
                    <select value={type} onChange={(e)=>setType(e.target.value)} className="dropdown-content">
                        <option value="title">title</option>
                        <option value="author">author</option>
                    </select>
                </div>
            </div>

          
            <button className="btn btn-sec">register</button>
        </div>
    )
}

export default Header
