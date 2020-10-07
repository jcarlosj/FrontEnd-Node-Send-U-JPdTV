import React, { useReducer } from 'react';

/** Context */
import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';

/** Types */
import { 
    SUCCESSFUL_REGISTRATION, 
    ERRONEOUS_REGISTRATION,
    HIDE_ALERT_COMPONENT 
} from '../../types';

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

    /** Register User */
    const registerUser = async data => {

        try {
            const response = await clientAxios      //  Implement request using Axios
                .post( 
                    '/api/users',                   //  Path requested to the BackEnd
                    data                            //  Data sent to the BackEnd
                );

            console .log( 'registerUser', response );

            dispath({       //  Modify the state using the Reducer
                type: SUCCESSFUL_REGISTRATION,
                payload: response .data .msg
            });
        } 
        catch( error ) {
            console .error( error .response .data .msg );
            dispath({       //  Modify the state using the Reducer
                type: ERRONEOUS_REGISTRATION,
                payload: error .response .data .msg
            });
        }

        /** Hide Alert Message */
        setTimeout( () => {
            dispath({       //  Modify the state using the Reducer
                type: HIDE_ALERT_COMPONENT
            });
        }, 5000 );
    }

    /** Authenticate User */
    const logIn = async data => {
        console .log( 'LogIn', data );
    }

    return(
        <AuthContext .Provider
            value={{ 
                token: state .token,
                authenticated_user: state .authenticated_user,
                user: state .user,
                msg: state .msg,
                registerUser,
                logIn
            }}
        >
            { children }
        </AuthContext .Provider>
    );
}

export default AuthState;