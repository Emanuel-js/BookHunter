import React, {useState } from "react";
import logo from '../../assets/img/logo.png';
import {Link,useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../contexts/AuthContext";
function Login() {
    // console.log(auth)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login,signInWithGoogle} =useAuth();
    const history = useHistory();
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !password)
        {
          toast.warn("Credentials not valid",{hideProgressBar: true,autoClose: 1500,theme:'dark'})    
        }
        login(email, password)
          .then(res => {
              toast.success("welcome back", { hideProgressBar: true, autoClose: 1500, theme: 'dark' });
                history.push('/')
              setEmail('');
              setPassword('');
        })
          .catch(error => {
            toast.warn(error.message,{hideProgressBar: true,autoClose: 1500,theme:'dark'})    
          })
        
        
      
    }
    const googlRegister = () => {
        signInWithGoogle().then((res) => {
            toast.success("you are successfully signIn ", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
            history.push('/')
        })
    }
 
    return (
        <div className="left-side">
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>
            <div className="title">
                Login 🗽
            </div>
            <div className="social-media">
                <div className="icons" onClick={googlRegister}>
                    <img src="https://img.icons8.com/bubbles/50/000000/google-logo.png" alt="Google" />
                </div>
               
            </div>
                
            <div className="label">or use your Email</div>
            <form className="form-controls" onSubmit={handleLogin}>
                <input type="email" className="form-control"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                    name="email" placeholder="Email" required />
                <input type="password" className="form-control"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                    name="password" placeholder="Password" required />
                                  <ToastContainer />

                <button type="submit" className="btn-custom btn-sec">Login</button>
            </form>
        </div>
    );
}

export default Login;
