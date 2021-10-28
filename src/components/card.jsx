import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './card.css';
import cover from '../assets/img/cover.jpg';

function Card({ books,published_date} ) {
  const [islike, setislike] = useState(false);

  return (
  <div>
    {
        books !== null ?
      <div className="card-container">
          <Link to={{
            pathname: '/detail',
            state:{book:books,published_date}
      }} className="card-imag">
              {books.book_image?
               <img src={books.book_image} alt="book cover"/>:<img src={cover} alt="cover" />}
          </Link>
       <div className="card-section">
              <div className="title"> { books.title||books.book_title}</div>
              <div className="sub-title">by {books.author ||books.book_author}</div>
              <div className="rate">{ books.rank?`rank ${books.rank}`:""}</div>
              <div className="disc">{books.description||books.summary}</div>
      </div>
      <div className="more">
        <div className="like icon">
        <img onClick={()=> setislike(!islike)} src={islike?"https://img.icons8.com/color/48/000000/like--v3.png":"https://img.icons8.com/ios-glyphs/24/000000/like--v2.png"} alt="like"/>        </div>
      </div>
    </div>:<div></div>
      }
       
      </div>
     
    )
}

export default Card
