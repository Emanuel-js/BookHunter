import React from 'react'
import './list.css';

function lists({author,img}) {
    
    return (
        <>
        <div className="list-container">
            <div className="img">
                <img src={img} alt="profile" />
            </div>
            <div className="title-container">
                    <div className="title">{ author.author}</div>
                {/* <div className="sub-title">Lorem Ipsum is simply dummy text of the printing</div> */}
            </div>
            </div>
            <div className="br-line"></div>

    </>
    )
}

export default lists
