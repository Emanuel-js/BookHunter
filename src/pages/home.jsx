import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Banner from './commen/banner';
import List from '../components/lists';
import Card from '../components/card';
import {APIKEY,url} from '../config/config';
import Header from './commen/header';
import Footer from './commen/footer';
import About from './about';

const Home = () => {
    const [newBook, setNewBook] = useState([]);
    const [bestSell, setBestSell] = useState([]);



    useEffect(() => {
        const getNewBooks = async () => {
            await axios.get(`${url}lists/current/hardcover-fiction.json?api-key=${APIKEY}`)
                        .then((d) =>setNewBook(d.data.results));

        }
        const getBestSell = async () => {
             await axios.get(`${url}lists/best-sellers/history.json?api-key=${APIKEY}`)
                .then((d) => {
                     setBestSell(d.data.results);         
                   });

                 }
        getNewBooks();
        getBestSell();
    }, []);

    return (
        <>
            {console.log(bestSell?.length)}
            <Header/>
            <Banner />
       {bestSell.length > 0 ?<div className="home-container">
                <div className="top-1" id="book">
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
                <div className=""><About /></div>

                <div className=""> <Footer /></div>

            </div> : <div className="loader"></div>
            }
            {/* <div style={{ marginTop: 440 }}>

            </div> */}
         

        </>
    )
 }
export default Home;
