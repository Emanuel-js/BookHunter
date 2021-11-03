import React,{useState, useEffect} from 'react';
import axios from 'axios';

import './book.css';
import Cards from '../components/Cards';
import {APIKEY,url } from '../config/config';
import Header from './commen/header';
import Footer from './commen/footer';


function Books() {
    const [bookList, SetBookList] = useState([]);
    const [listName, setListName] = useState([]);
    const [value,setValue] = useState('Hardcover Nonfiction');
    
    useEffect(() => {
        const getname =async () => {
            await axios.get(`${url}lists/names.json?api-key=${APIKEY}`)
                .then(name => {
                    setListName(name.data.results)
                });

        }
        const getBookLists = async () => {
            await axios.get(`${url}lists/${value}.json?api-key=${APIKEY}`)
                .then(d => {
                   
                     SetBookList(d.data.results)
                });
    } 
      
        getname();
        getBookLists();
    }, [value])

    const handleChange = (e) => {

        setValue(e.target.value);
        console.log(value);
    }

    return (
        <>
          
            <Header/>
            {
             listName.length > 0?     <div className="book-container">
                  <div>Filter Books
                      <select value={value} onChange={handleChange} className="select-menu">
                          {
                             
                              listName?.map(name => {
                                  return <option key={name.list_name} value={name.list_name}>{ name.list_name}</option>
                              })
                          }
                       </select>
      
                  </div>
                  <div className="book-list">
                  {
                      bookList?.books?.map((book,i) => {
                         return   <Cards key={i} books={book} published_date={bookList.published_date} /> 
                      })
                    }
                </div>
                 
                  </div>:<div className="loader"></div>
      }
            <Footer/>
            </>
    )
}

export default Books
