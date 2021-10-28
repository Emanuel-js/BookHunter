import React from 'react'

function footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <a href="#" className="top link">
                <img src="https://img.icons8.com/doodle/48/000000/up--v1.png"/>
                </a>
                <div className="title">Contact Me</div>
                <div className="contact">
                <a href ="https://github.com/Emanuel-js"  target="_blank" rel="noreferrer" className="sub-link"><img src="https://img.icons8.com/color/48/000000/github--v3.png"/></a>
                <a href ="https://twitter.com/emanuel94752162" target="_blank" rel="noreferrer" className="sub-link"><img src="https://img.icons8.com/plasticine/100/000000/twitter--v2.png"/></a>
                <a href = "https://www.linkedin.com/in/emanuel-awol/" target="_blank" rel="noreferrer" className="sub-link"><img src="https://img.icons8.com/dusk/64/000000/linkedin.png"/></a>
                </div>
                <div className="copy">
                    Amanuel Awol 
                <img className="copyright" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-copyright-marketing-seo-flatart-icons-outline-flatarticons.png"/>
                 2021
                </div>
               </div>
        </div>
    )
}

export default footer
