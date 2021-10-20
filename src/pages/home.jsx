import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Banner from './commen/banner';
import List from '../components/lists';
import Card from '../components/card';
import config from '../config/config';

const Home = () => {
    const [newBook, setNewBook] = useState([]);
    const [bestSell, setBestSell] = useState([]);



    useEffect(() => {
        // const APIKEY = "x2esQNAYiMY5mz3ArTz5uJ3q4FizdL7l";
        // const url = 'https://api.nytimes.com/svc/books/v3/lists/';
        
        const getNewBooks = async () => {
            await axios.get(`${config.url}lists/current/hardcover-fiction.json?api-key=${config.APIKEY}`)
                        .then((d) =>setNewBook(d.data.results));

        }
        const getBestSell = async () => {
             await axios.get(`${config.url}lists/best-sellers/history.json?api-key=${config.APIKEY}`)
                .then((d) => {
                     setBestSell(d.data.results);         
                   });

                 }
        getNewBooks();
        getBestSell();
    }, []);

    return (
        <>
            <Banner />
       {newBook && bestSell  !==[]?<div className="home-container">
                <div className="top-1">
                    <div className="popular-author ">
                        <h2>Popular Authors</h2>
                        <div className="list-of-auther">
                    
                        {
                                bestSell.map((a, i) => {
                                    
                                    return <List author={a} img={`https://i.pravatar.cc/100${i}`} key={ i }/>
                                })
                            }
                            </div>
                    </div>
                    <div className="new-book">
                        <h2>New Books</h2>
                        <div className="card-lists">
                            {
                                newBook?.books?.map((b, i) => {
                                    
                                    return <Card published_date={newBook.published_date} books={b} key={ i }/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="top-2">
                    <h2>Best Sellers Book</h2>
                    <div className="card-lists-best">
                    {
                                bestSell.map((b, i) => {
                                    
                                    return <Card books={b} key={ i }/>
                                })
                            }
                    </div>
                </div>
            </div>:<div className="loader"></div>}
        </>
    )
 }
export default Home;
