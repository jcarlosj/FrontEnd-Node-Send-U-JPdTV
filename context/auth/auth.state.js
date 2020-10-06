import React, { useReducer } from 'react';
import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';
import { AUTHENTICATED_USER } from '../../types';

/** Define State:
 * Actions that trigger the functions that are in the Reducer
 */
const AuthState = ({ children }) => {

    const 
        initialState = {            //  Define State
            token: '',
            authenticated_user: null,
            user: null,
            msg: null
        },
        [ state, dispath ] = useReducer( AuthReducer, initialState );   //  Define Reducer

    const getUserAuthenticated = name => {
        dispath({       //  Modify the state using the Reducer
            type:AUTHENTICATED_USER,
            payload: name
        });
    }

    return(
        <AuthContext .Provider
            value={{ 
                token: state .token,
                authenticated_user: state .authenticated_user,
                user: state .user,
                msg: state .msg,
                getUserAuthenticated
            }}
        >
            { children }
        </AuthContext .Provider>
    );
}

export default AuthState;