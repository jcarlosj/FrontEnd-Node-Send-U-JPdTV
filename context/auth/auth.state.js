import React, { useReducer } from 'react';
import AuthContext from './auth.context';

/** Define State:
 * Actions that trigger the functions that are in the Reducer
 */
const AuthState = ({ children }) => {

    return(
        <AuthContext .Provider
            value={{ }}
        >
            { children }
        </AuthContext .Provider>
    );
}

export default AuthState;