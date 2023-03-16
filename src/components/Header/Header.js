import React from 'react'
import './Header.css';
const Header = () => {


    return (
        <>
            <span className='header' onClick={() => window.scroll(0, 0)}> 🎬 Movie-Flix </span>
        </>
    )
}

export default Header
