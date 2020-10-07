import React, { useReducer } from 'react';

/** Context */
import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';

/** Types */
import { 
    SUCCESSFUL_REGISTRATION, 
    ERRONEOUS_REGISTRATION,
    ERRONEOUS_LOGIN,
    HIDE_ALERT_COMPONENT, SUCCESSFUL_LOGIN 
} from '../../types';

/** Dependencies */
import clientAxios from '../../config/axios';

/** Define State:
 * Actions that trigger the functions that are in the Reducer
 */
const AuthState = ({ children }) => {

    const 
        initialState = {            //  Define State
            token: ( typeof window !== 'undefined' ) ? localStorage .getItem( 'rns_token' ) : '',       //  Check if token exists in Storage to set it as default in Auth Context State
            is_authenticated: ( typeof window !== 'undefined' ) ? true : null,                          //  Check if token exists in Storage to set it as default in Auth Context State
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

        try {
            const response = await clientAxios      //  Implement request using Axios
                .post( 
                    '/api/auth',                    //  Path requested to the BackEnd
                    data                            //  Data sent to the BackEnd
                );    
            
            console .log( 'LogIn', response );    

            dispath({       //  Modify the state using the Reducer
                type: SUCCESSFUL_LOGIN,
                payload: response .data .token
            });
        } 
        catch ( error ) {
            console .error( error .response .data .msg );
            dispath({       //  Modify the state using the Reducer
                type: ERRONEOUS_LOGIN,
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

    return(
        <AuthContext .Provider
            value={{ 
                token: state .token,
                is_authenticated: state .is_authenticated,
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