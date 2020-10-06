import React, { useReducer } from 'react';

/** Context */
import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';

/** Types */
import { AUTHENTICATED_USER } from '../../types';

/** Dependencies */
import clientAxios from '../../config/axios';

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

    const registerUser = async data => {
        console .log( 'Registrar Usuario' );

        try {
            const response = await clientAxios      //  Implement request using Axios
                .post( 
                    '/api/users',                   //  Path requested to the BackEnd
                    data                            //  Data sent to the BackEnd
                );

            console .log( 'registerUser', response );
        } 
        catch( error ) {
            console .error( error );
        }
    }

    return(
        <AuthContext .Provider
            value={{ 
                token: state .token,
                authenticated_user: state .authenticated_user,
                user: state .user,
                msg: state .msg,
                getUserAuthenticated,
                registerUser
            }}
        >
            { children }
        </AuthContext .Provider>
    );
}

export default AuthState;