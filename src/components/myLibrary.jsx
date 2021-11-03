import React, { useEffect, useState } from 'react';
import { collection, getDocs,query,where,deleteDoc,doc} from "firebase/firestore";
import { db } from '../config/firebase';
import Card from "./MyLibraryCard";
import { useAuth } from '../contexts/AuthContext';
import {toast } from 'react-toastify';
function MyLibrary() {


    const [book, setBook] = useState([]);
    const { currentUser } = useAuth();
    
    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "Library"), where("UID","==", currentUser?.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setBook(old => [...old, doc]);
            });
   
        }
      
        getData();
    }, [currentUser.uid]);

    function refreshPage() {
        window.location.reload(false);
    }
    const deleteHandler =async (id) => {
        await deleteDoc(doc(db, `Library`, id)).then((res) =>
        {
            toast.success("your favorite book was removed!", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
           refreshPage();
        }
        );
}
    return (
        <div>
          
            {book.length >0 && <div className="title" style={{textAlign: 'center',margin:30}}> You shared { book.length} {book.length ===1?"book":"books"}  😍</div>}
            <br/>
      
        <div className="container-container">
            {

book.length !== 0? book.map((book,id) => {
    return <Card key={id} data={book} deleteHandler={deleteHandler} ismy={ true}/>
}) : <div className="title center">no book you share ! 😥</div>
}
            </div>
            </div>
    )
}

export default MyLibrary;
