import React from 'react'
import { Link} from 'react-router-dom';
import './banner.css';
function banner() {
    return (
        <div className="banner-container">
            <div className="banner-left">
                <h1>Explore your own <span>books world!</span></h1>
                <p>read your favorite book and share to your</p>
                <p>friends or family</p>
              <a href="#book" className="link"><button className="btn btn-sec">Explore</button></a>
            </div>
            <div className="banner-right"></div>
        </div>
    )
}

export default banner
