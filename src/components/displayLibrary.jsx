import React, { useEffect, useState } from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../config/firebase';
import Card from "./MyLibraryCard";


function DisplayLibrary() {


    const [book, setBook] = useState([]);
    
    
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "Library"))
            querySnapshot.forEach((doc) => {
                setBook(old => [...old, doc]);
            });
        
        }
      
        getData();
    }, []);
 
    return (
        <div>
            {book.length >0 && <div className="title" style={{textAlign: 'center',margin:30}}> You have { book.length} {book.length ===1?"book":"books"} to download or read 🚀</div>}
            <br/>
      
        <div className="container-container">
            {

book.length !== 0? book.map((book,id) => {
 // // setbook(doc.data());
    return <Card key={book.id+id} id ={book.id} data={book} />
}) : <div className="title center">No Book here to Download! 🍮</div>
}
            </div>
            </div>
    )
}

export default DisplayLibrary;
