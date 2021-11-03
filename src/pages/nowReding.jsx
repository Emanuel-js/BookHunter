import React,{useState, useEffect} from 'react'
import { collection, getDocs,deleteDoc ,doc,updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

import Cards from '../components/Cards';
import Header from './commen/header';
import Footer from './commen/footer';
import { useAuth } from '../contexts/AuthContext';
function NowReading() {

    const [book, setbook] = useState([]);
    const [isbookComlete, setIsbookComlete] = useState(false);

    // let books = [];
    const { currentUser } = useAuth();

    useEffect(() => {
        const getData = async () => {

            const querySnapshot = await getDocs(collection(db, `Reading/${currentUser?.uid}`,"reading"));
            querySnapshot.forEach((doc) => {
                setIsbookComlete(doc.data().isFinished);
               setbook(old => [...old, doc.data()]);
               
            });
        }
      
        getData();
    }, [currentUser?.uid]);
    function refreshPage() {
        window.location.reload(false);
    }
    const deleteData = async (id) => {
        console.log(id);

        await deleteDoc(doc(db, `Reading/${currentUser.uid}`,"reading", id)).then((res) =>
        {
            toast.success("book is removed!", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
              refreshPage();
        }
        );
    }
    const completed = async (id) => {
        setIsbookComlete(!isbookComlete);
        await updateDoc(doc(db, `Reading/${currentUser.uid}`, "reading", id), {
            isFinished: isbookComlete
        }).then(() => {
            toast.success("you Finished this book", { hideProgressBar: true, autoClose: 1500,theme:'dark'})
       //     refreshPage();

        });
    }
   
    return (
        <div>
            <ToastContainer />
            <Header />
            {book?.length >0 && <div className="title" style={{textAlign: 'center',margin:30}}> You have{ book.length}  {book.length ===1?"book":"books"} to read📓</div>}
            {
               book?.length !== 0? book.map((book,id) => {
                // // setbook(doc.data());
                   return <Cards key={id} isFinished={book.isFinished} books={book.book} deleteData={deleteData} isfav={true} reading={true} completed={completed}/>
               }) : <div className="title center">No Book To Read Is Here! 🍮

                    </div> 
           }
          <Footer/>
        </div>
    )
}

export default NowReading
