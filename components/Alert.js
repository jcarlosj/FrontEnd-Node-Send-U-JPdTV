import React, { useContext } from 'react';

import AuthContext from '../context/auth/auth.context';

/** Component */
const Alert = () => {

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        { msg } = authContext;

    return(
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded shadow-md">
            { msg }
        </div>
    );
}

export default Alert;