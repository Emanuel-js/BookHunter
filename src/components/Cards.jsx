import React from 'react'
import {Link} from 'react-router-dom'
function Cards({books,published_date,isfav,deleteData}) {
    return (
        <div className="cards-container">
            <Link  to={{
            pathname: '/detail',
            state:{book:books,published_date}
      }}className="img-section">
              <img src={books?.book_image} alt="cover"/>
            </Link>
            <div className="info">
                <div className="title">{ books?.title}</div>
                <div className="sub-title">by { books?.author}</div>
                <div className="disc">{ books?.description}</div>
            </div>

            <div className="like icon">
                {
                    isfav ? <img onClick={(e)=>deleteData(books.primary_isbn10)} src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-close-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png"/>
                        :<img src="https://img.icons8.com/color/48/000000/like--v3.png" alt="like"/>

                }
            </div>
           
           
            {/* <div className="btn-co2">
                     
                    <button className="btn btn-prim">completed</button>
                     <button className="btn btn-sec">comment</button>
             </div>
             */}


        </div>
    )
}

export default Cards
