import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cover from '../assets/img/cover.jpg';
import { FacebookIcon,FacebookShareButton,TelegramShareButton,TelegramIcon,TwitterShareButton,TwitterIcon} from 'react-share';

function Cards({ books, published_date, isfav, deleteData, reading, completed, comment,isFinished}) {
    const [islike, setislike] = useState(false);
    return (
        <div className={`cards-container ${isFinished?"completed":"notcompleted"}`}>
            <Link  to={{
            pathname: '/detail',
            state:{book:books,published_date}
      }}className="img-section">
              <img src={books?.book_image || cover} alt="cover"/>
            </Link>
            <div className="info">
                <div className="title">{ books?.title}</div>
                <div className="sub-title">by { books?.author}</div>
                <div className="disc">{books?.description}</div>
                {isfav && books?.buy_links &&
                    <div className="share">
                    {/* <div className="sub-title">Share to social media</div>  */}
                    <FacebookShareButton url={books?.buy_links[0].url}
                        quote="I love this book please read it!"
                        hashtag={"#bestBook", "#reading","#bookHunter"}
                    >
                    <FacebookIcon width="50" height="50"round ={true} />
                    </FacebookShareButton>
                    <TelegramShareButton url={books?.buy_links[0].url}
                        title="Book Hunter"
                    >
                        <TelegramIcon  width="50" height="50" round ={true} />
                    </TelegramShareButton>
                   
                    <TwitterShareButton url={books?.buy_links[0].url}
                        quote="I love this book please read it!"
                        hashtag={"#bestBook", "#reading","#bookHunter"}
                    >
                    <TwitterIcon width="50" height="50"round ={true} />
                    </TwitterShareButton>
                </div>
                
                }
            </div>

            <div className="like icon">
                {
                    isfav ? <button type="submit" className="btn" onClick={(e)=>deleteData(books?.primary_isbn10 || books?.isbns[0].isbn10 || books.isbn13[0])} ><img  alt="X" src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-close-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png"/></button>
                        : <img onClick={()=> setislike(!islike)} src={islike?"https://img.icons8.com/color/48/000000/like--v3.png":"https://img.icons8.com/ios-glyphs/24/000000/like--v2.png"} alt="like"/>
                }
            </div>
           
           
            {reading?<div className="btn-co2">
                     
              {  !isFinished? <button className="btn btn-prim" onClick={(e) => completed(books?.primary_isbn10 || books?.isbns[0].isbn10 || books.isbn13[0])}>completed</button>:""}
                     <button className="btn btn-sec"  onClick={(e)=>comment(books?.primary_isbn10 || books?.isbns[0].isbn10 || books.isbn13[0])}>comment</button>
             </div>:""
            }


        </div>
    )
}

export default Cards
