import React,{useState, useEffect} from 'react'
import { collection, getDocs,deleteDoc ,doc } from "firebase/firestore";
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

import Cards from '../components/Cards';
import Header from './commen/header';
import { useAuth } from '../contexts/AuthContext';
function MyFav() {

    const [book, setbook] = useState([]);
    const [count, setCount] = useState(0);
    const [isload, setisload] = useState(false);
    // let books = [];
    const { currentUser } = useAuth();

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, `Favorite/${currentUser?.uid}`,"favorite"));
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                setbook(old =>[...old,doc.data().book]);
            });
        }
      
        getData();
    }, []);
    function refreshPage() {
        window.location.reload(false);
    }
  
    const deleteData = async (id) => {
        await deleteDoc(doc(db, `Favorite/${currentUser.uid}`,"favorite", id)).then((res) =>
        {
            toast.success("your favorite book was removed!", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
           refreshPage();
        }
        );
    }

    return (
        <div>
            <ToastContainer />
            <Header />
            {book.length >0 && <div className="title" style={{textAlign: 'center',margin:30}}> You have{ book.length} favorite {book.length ===1?"book":"books"} 📓</div>}
            {

               book.length !== 0? book.map((book,id) => {
                // // setbook(doc.data());
                   return <Cards key={id} books={book} deleteData={deleteData}isfav={ true}/>
               }) : <div className="title center">No Favorite Book Is Here! 🍮</div>
           }
          
        </div>
    )
}

export default MyFav
