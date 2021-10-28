import React,{useState} from 'react';
import Login from './login';
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';


function Register() {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');
    const [name, setName] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const {register,currentUser,signInWithGoogle} =useAuth();
   // get imag url 
  const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setProfile(URL.createObjectURL(event.target.files[0]));
      }
    }
    const handleRegister = (e) => {
    
        e.preventDefault()
     
        if (name.length < '3') {
        toast.warn("Name Must be > 3 characters 😞",{hideProgressBar: true,autoClose: 1500,theme:'dark'})
        } else if (password.length < 7)
        {
            toast.warn("password must be at least 7 characters😞",{hideProgressBar: true,autoClose: 1500,theme:'dark'})
        }
        else {
         
            setIsSubmit(true);
          
            //  const id = toast.loading("Please wait...")
            //  toast.update(id, { render: "All is good", type: "success", isLoading: !isSubmit });
            
            register(email, password,name,profile)
                .then(res => {
                    toast.success("you are successfully registered 🏃‍♀️", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
                    // currentUser.sendEmailVerification();
                   
                    reset();
                })
                .catch(error => {
                    setIsSubmit(false)
                    toast.dark(`⚠️${error.message}`, { hideProgressBar: true, autoClose: 1500, })
                })
                .finally(() => {
                    setIsSubmit(false)
                });
        }
     
    }
    const reset = () => {
        setName('');
        setEmail('');
        setProfile('');
        setPassword('');
    }

    return (
        <div className="register-container">
            <Login/>
            <div className="right-side">
                <div className="title">
                    Create Account 🚀
                </div>
             
                <form className="form-control" onSubmit={handleRegister}>
                    <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required/>
                    <input type="email" className="form-control" name="email"value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
                    <input type="password" className="form-control" name="password" value={password} onChange={e => setPassword(e.target.value)}placeholder="Password"required />
                    <label className="lable">Profile</label>
                    <ToastContainer />

                   {profile? <img src={profile} alt="" style={{width:50,height:50} }/>:""}
                    <input type="file" className="form-control" name="profile"  onChange={onImageChange} placeholder="Profile" />
                <button type="submit" className="btn btn-prim">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register;
