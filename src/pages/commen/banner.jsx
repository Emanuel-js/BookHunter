import React from 'react'
import './banner.css';
function banner() {
    return (
        <div className="banner-container">
            <div className="banner-left">
                <h1>Explore your own <span>books world!</span></h1>
                <p>read your favorite book and share to your</p>
                <p>friends or family</p>
                <button className="btn btn-sec">Explore</button>
            </div>
            <div className="banner-right"></div>
        </div>
    )
}

export default banner
