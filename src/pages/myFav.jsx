import React,{useState, useEffect} from 'react'
import { collection, getDocs,deleteDoc ,doc } from "firebase/firestore";
import { db } from '../config/firebase';
import Cards from '../components/Cards';
import { toast } from 'react-toastify';
import Header from './commen/header';
function MyFav() {

    const [book, setbook] = useState([]);
 
    // let books = [];

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "Favorite"));
            querySnapshot.forEach((doc) => {
                setbook(old =>[...old,doc.data().book]);
            });
        }
        getData();
    }, []);

    const deleteData =async(id)=>{
        await deleteDoc(doc(db, "Favorite", id)).then((res) =>
       {     toast.success("your favorite book was removed!")
        }
        );
    }

    return (
        <div>
            <Header/>
         {
               book.length !== 0? book.map((book) => {
                // // setbook(doc.data());
                    return <Cards books={book} deleteData={deleteData}isfav={ true}/>
               }) : <div className="title center">No Favorite Book Is Here! 🍮</div>
            }
          
        </div>
    )
}

export default MyFav
