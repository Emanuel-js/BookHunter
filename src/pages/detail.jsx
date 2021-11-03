import React,{useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { db } from '../config/firebase';
import {setDoc,doc} from 'firebase/firestore'
import axios from "axios"
import cover from '../assets/img/cover.jpg';
import './detail.css';
import blogo from '../assets/img/BarnesandNoble.png';
import bookLo from '../assets/img/bookm.png';
import Card from '../components/card';
import {APIKEY,url } from '../config/config';
import Header from './commen/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';


function Detail() {
    const [relatedBook, setRelatedBook] = useState([]);

    const { currentUser} = useAuth();

    let location = useLocation();
    const { book, published_date } = location?.state
    // console.log(book.isbn13[0]);
    useEffect(() => {
        const getrelated = async () => {
            await axios.get(`${url}reviews.json?author=${book.author}&api-key=${APIKEY}`)
                           .then((d) => 
                           {
                               setRelatedBook(d.data.results)
                           });
             }
        getrelated();
    }, [book.author]);

// add book to reading db
    const addToRead = async (book) => {
        if (currentUser) {
            
            try {
            await setDoc(doc(db, `Reading/${currentUser.uid}`, "reading",`${book?.primary_isbn10 || book?.isbns[0].isbn10 || book?.isbn13[0]}`), {
              UID: currentUser.uid,
              book:book,
              isFinished: false,
            }).then(() => toast.success("Book is Added!", { hideProgressBar: true, autoClose: 1500,theme:'dark'}) );
        }catch (e) {
            toast.warn("please try again later", { hideProgressBar: true, autoClose:1000,theme:'dark'})
          }
    } else {
        toast.warn("please register or login first!", { hideProgressBar: true, autoClose: 1500,theme:'dark'}) 
    }
    }
    const AddToFav = async(book) => {
        if (currentUser) {
            try { 
                 await setDoc(doc(db, `Favorite/${currentUser.uid}`, "favorite",`${book?.primary_isbn10 ||book?.isbns[0].isbn10 || book?.isbn13[0]}`), {
                  UID: currentUser.uid,
                  book:book,
                  bookId:book?.primary_isbn10 || book?.isbns[0].isbn10 || book.isbn13[0]
                }).then(() => toast.success("your Favorite Book is Added!", { hideProgressBar: true, autoClose: 1500,theme:'dark'}) );
            } catch (e) {
                toast.warn("please try again later", { hideProgressBar: true, autoClose:1000,theme:'dark'})
              }
        } else {
            toast.warn("please register or login first!", { hideProgressBar: true, autoClose: 1500,theme:'dark'}) 

        }
    }
    return (
        <>
          <Header/>  
        <div className="detail-container">
            <div className="detail-section">
                <div className="cover">
                {book.book_image?<img src={book.book_image} alt="cover"/>:<img src={cover} alt="cover"/>}
                </div>
                <div className="detail">
                    <div className="title">{book.title||book.book_title }📓 </div>
                    <div className="sub-title"> by { book.author||book.book_author}🙋</div>
                    <div className="disc">{ book.description || book.summary}</div>
                    <div className="co1">
                        <div className="rete">{published_date ? <div><b>publishedDate:</b> {published_date}📅</div>:""}</div><br/><br/>
                        <div className="date"><b>publisher:</b> {book.publisher ||book.byline}</div>
                    </div>
                    <div className="btn-co1">
                       <button className="btn btn-prim" onClick={(e)=>addToRead(book)}>Add To Read</button>
                        <button className="btn btn-sec" onClick={(e)=>AddToFav(book)}>Add to Fav</button>
                        </div>
                        <ToastContainer />

                </div>
              {book.buy_links?  <div className="buy-list">
                    <h3>Buy Links</h3> <br/>
                {
                            book?.buy_links?.map(l => {
                                if (l.name === 'Amazon')
                                  return  <a key={l.url} className="link link-logo " target="_blank"rel="noreferrer" href={l.url}><img alt="logo" src="https://img.icons8.com/cute-clipart/64/000000/amazon.png"/></a>
                               else if (l.name === 'Apple Books')
                                 return  <a key={l.url} className="link link-logo" target="_blank"rel="noreferrer" href={l.url}><img alt="logo" src="https://img.icons8.com/color/48/000000/ibooks.png"/></a>
                              else  if(l.name === 'Barnes and Noble')
                                  return  <a key={l.url} className="link link-logo" target="_blank"rel="noreferrer" href={l.url}><img alt="logo" src={blogo}/></a>
                               else if(l.name === 'Books-A-Million')
                                    return <a key={l.url} className="link link-logo" target="_blank"rel="noreferrer" href={l.url}><img alt="logo" src={ bookLo}/></a>
                                else if(l.name === 'Bookshop')
                                return  <a key={l.url} className="link link-logo" target="_blank" rel="noreferrer"href={l.url}><img alt="logo" src="https://img.icons8.com/ios/50/000000/bookshop.png"/></a>
                                 else
                                 return  <a key={l.url} className="link link-logo" target="_blank"rel="noreferrer" href={l.url}><img alt="logo" src="https://img.icons8.com/color-glass/48/000000/bookmark.png"/></a>
                   
                                //  return <div>{ l.name}</div>
                            
                            })
                }
                </div>:<></>}
                </div>
                {relatedBook?.length > 0 ?<div className="related">
                    
                        <h2>Related Books📚</h2>
                        <div className="related-section">
                       {  relatedBook.map((book, i) => <Card books={book} published_date={book.published_dt} key={book.isbn13[i]} />)}
                        </div>
                    
                    </div>:<div className="title" style={{ textAlign: 'center', margin: '50px auto' }}>No related book 😞</div>

                }
            </div>
            </>
    )
}

export default Detail;
