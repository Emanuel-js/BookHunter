import React,{useState} from 'react'
import './header.css';
import logo from '../../assets/img/logo.png';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {Navbar,Nav,Form,Container,FormControl,Dropdown,DropdownButton} from "react-bootstrap";
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
        if (query === '') {
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
     
    const setTypeByName = (e, type) => {
        e.preventDefault();
        setType(type);
        handleSearch();
    }
    
    return (
        <div className="header-container">
         
            <Navbar  expand="lg">
         
  <Container fluid>
  <Link to="/"className="logo" >
                <img src={logo} alt="logo" />
            </Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
          <ul className="menu mr-t" >
                <NavLink exact to="/" activeClassName="active"><li>Home</li></NavLink>
                <NavLink to="/book" activeClassName="active"><li>Books</li></NavLink>
                {currentUser && <NavLink to="/myFav" activeClassName="active"><li>MyFav</li></NavLink>}
                {currentUser && <NavLink to="/reding" activeClassName="active"><li>NowReading</li></NavLink>}
                {currentUser && <NavLink to="/library" activeClassName="active"><li>Library</li></NavLink>}
                </ul>
    
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-1"
          aria-label="Search"
          value={query}
          onChange={(e)=>  setQuery(e.target.value) }
                            />
                        
            <DropdownButton id="dropdown-item-button" className="mr-t mr-l"   title="Search">
            <Dropdown.Item as="button" onClick={(e)=>setTypeByName(e,"title")}>title</Dropdown.Item>
            <Dropdown.Item as="button" onClick={(e)=>setTypeByName(e,"author")}>author</Dropdown.Item>
            </DropdownButton>
                                        
        {
                currentUser === null ? <Link to="/register"> <button className="btn-custom btn-prim">register</button></Link> :
                <Link to="/register"> <button className="btn-custom btn-prim" onClick={logout}>Logout</button></Link>

        
        }
                        </Form>
           </Navbar.Collapse>
           {currentUser && <img src={currentUser.photoURL} alt={currentUser.displayName} style={{width: '40px', height: '40px', borderRadius:'50%'}}/>}

                </Container>
            </Navbar>
            <ToastContainer />
         

        </div>
    )
}

export default Header;
