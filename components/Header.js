import React from 'react';

/** Component */
const Header = () => {
    return(
        <header className="py-8 flex flex-col md:flex-row itmes-center justify-between">
            <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
        </header>
    );
}

export default Header;