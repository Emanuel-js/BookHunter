import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import Card from '../components/card';

function Search() {
    const location = useLocation();
    const [query, setQuery] = useState(location.state.query);
    let type  = location.state.type;
    const [search, setSearch] = useState([]);
    const [isload, setisload] = useState(false);

    useEffect(() => {
       
        const searchBook =async () => {
            await axios.get(`${config.url}reviews.json?${type}=${query}&api-key=${config.APIKEY}`)
                .then(d => {
                    console.log(d.data)
                    setSearch(d.data.results);
                    setisload(!isload);
            }).catch(err=>console.log(err.message));
        }
        searchBook();
    }, [query])


    const display = () => {
        console.log(isload,search)
        if (search !== [] && isload) {
            search.map((book, i) => {
                return  <Card books={book} published_date={book.published_dt} key={book.isbn13[i]}/>
                })
        }
        else if (isload === false) {
            return <div className="loader"></div>
        } else {
            <div className="error">/reviews.json?title=Becoming</div>
        }
    }

    return (
        <div className="search-container">
            {
            //   display()

                search !==[] && isload ?search.map((book, i) => {
                    return  <Card books={book} published_date={book.published_dt} key={book.isbn13[i]}/>
                    }):<div className="loader"></div>
            }
        </div>
    )
}

export default Search
