import React from 'react';
import Link from 'next/link';

/** Component */
const Header = () => {
    return(
        <header className="py-8 flex flex-col md:flex-row itmes-center justify-between">
            <Link href="/">
                <a>
                    <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
                </a>
            </Link>
            
            <div>
                <Link href="/log-in">
                    <a className="bg-red-400 px-5 py-3 rounded-lg text-white font-bold uppercase mx-1">Iniciar Sesión</a>
                </Link>
                <Link href="/create-account">
                    <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase mx-1">Crear cuenta</a>
                </Link>
            </div>
        </header>
    );
}

export default Header;