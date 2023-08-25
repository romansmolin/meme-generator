import React from "react";
import "./Header.css";

const Header = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header__left">
                    <img src={require('../../assets/Trollface.png')} alt="Logo" />
                    <h1 className="header__title">Meme Generator</h1>
                </div>
                <div className="header__subtitle">React Course - Project 3</div>
            </div>
        </header>
    );
}

export default Header;