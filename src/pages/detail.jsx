import React,{useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios"
import cover from '../assets/img/cover.jpg';
import './detail.css';
import blogo from '../assets/img/BarnesandNoble.png';
import bookLo from '../assets/img/bookm.png';
import Card from '../components/card';
import config from '../config/config';


function Detail() {
    
    const [relatedBook, setRelatedBook] = useState([]);

    let location = useLocation();
    const  {book,published_date}  = location?.state



    useEffect(() => {
   
        const getrelated = async () => {
            await axios.get(`${config.url}reviews.json?author=${book.author}&api-key=${config.APIKEY}`)
                           .then((d) => 
                           {
                               setRelatedBook(d.data.results)
                           });
        }
        getrelated();
    }, [book.author]);

    return (
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
                        <button className="btn btn-prim">Add To Read</button>
                        <button className="btn btn-sec">Add to Fav</button>
                    </div>
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
            <div className="related">
                <h2>Related Books📚</h2>
                <div className="related-section">
   {relatedBook !==[]? relatedBook.map((book,i)=> <Card books={book} published_date={book.published_dt} key={book.isbn13[i]}/>):<div>No related book 😞</div>
}
                </div>
            </div>
        </div>
    )
}

export default Detail;
