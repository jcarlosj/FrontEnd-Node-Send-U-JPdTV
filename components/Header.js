import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

/** Context */
import AuthContext from '../context/auth/auth.context';

/** Component */
const Header = () => {

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        {   user, 
            getAuthenticatedUser, SignOff 
        } = authContext;

    /** Change tracking
     * Similar to componentDidMount and componentDidUpdate  */
    useEffect( () => {
        getAuthenticatedUser();     //  Extract authenticated user from token in LocalStorage
    }, [] );

    return(
        <header className="py-8 flex flex-col md:flex-row itmes-center justify-between">
            <Link href="/">
                <a>
                    <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
                </a>
            </Link>
            
            <div>
                { /** Check if there is an authenticated user to show options */
                    user 
                    ?   <div className="flex">
                            <p className="px-5 py-3 rounded mx-1">Hola, { user .name } </p>
                            <button 
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase mx-1"
                                onClick={ () => SignOff() }
                            >Cerrar sesión</button>
                        </div>
                    :   <>
                            <Link href="/log-in">
                                <a className="bg-red-400 px-5 py-3 rounded-lg text-white font-bold uppercase mx-1">Iniciar Sesión</a>
                            </Link>
                            <Link href="/create-account">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase mx-1">Crear cuenta</a>
                            </Link>
                        </>
                }
            </div>
        </header>
    );
}

export default Header;