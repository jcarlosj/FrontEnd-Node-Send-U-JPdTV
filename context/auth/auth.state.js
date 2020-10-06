import React, { useReducer } from 'react';
import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';

/** Define State:
 * Actions that trigger the functions that are in the Reducer
 */
const AuthState = ({ children }) => {

    const 
        initialState = {            //  Define State
            token: '',
            is_authenticated: null,
            user: null,
            msg: null
        },
        [ state, dispath ] = useReducer( AuthReducer, initialState );   //  Define Reducer

    return(
        <AuthContext .Provider
            value={{ 
                token: state .token,
                is_authenticated: state .is_authenticated,
                user: state .user,
                msg: state .msg
            }}
        >
            { children }
        </AuthContext .Provider>
    );
}

export default AuthState;