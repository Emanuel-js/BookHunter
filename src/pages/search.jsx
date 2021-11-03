import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {APIKEY,url} from '../config/config';
import Card from '../components/card';
import Header from './commen/header';

function Search() {
    const location = useLocation();
    const [query, setQuery] = useState(location.state.query);
    let type  = location.state.type;
    const [search, setSearch] = useState([]);
    const [isload, setisload] = useState(false);

    useEffect(() => {
       
        const searchBook =async () => {
            await axios.get(`${url}reviews.json?${type}=${query}&api-key=${APIKEY}`)
                .then(d => {
                    console.log(d.data)
                    setSearch(d.data.results);
                    setisload(!isload);
            }).catch(err=>console.log(err.message));
        }
        searchBook();
    }, [query])


    const display = () => {
        if (search.length > 0) {
            return search.map((book, i) => {
                return <Card books={book} published_date={book.published_dt} key={book.isbn13[i]} />
            });
        }
        else if (isload === false) {
            return <div className="loader"></div>
        } else {
          return  <div className="title center">No data found</div>   
        }
    }

    return (
         <>
            <Header/>
        <div className="search-container">
            {
               display()
            }
            
            </div>
            </>
    )
}

export default Search



// !isload? search.length > 0? search.map((book, i) => {
//     return  <Card books={book} published_date={book.published_dt} key={book.isbn13[i]}/>
//     }):<div className="title center">No data found</div>:<div className="loader"></div>
