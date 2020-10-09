import React, { useReducer } from 'react';

/** Context */
import AppContext from './app.context';
import AppReducer from './app.reducer';

/** Types */
import { 
    SHOW_ALERT_COMPONENT,
    HIDE_ALERT_COMPONENT,
    SUCESSFUL_FILE_UPLOAD,
    ERRONEOUS_FILE_UPLOAD,
    LINK_SUCCESSFULLY_CREATED,
    ERROR_CREATING_LINK
} from '../../types';

/** Define State:
 * Actions that trigger the functions that are in the Reducer
 */
const AppState = ({ children }) => {

    const 
        initialState = {
            msg_file: ''
        },            //  Define State
        [ state, dispath ] = useReducer( AppReducer, initialState );   //  Define Reducer

    /** Show alert message */
    const showMessage = msg => {
        console .log( 'showMessage', msg );
        dispath({
            type: SHOW_ALERT_COMPONENT,
            payload: msg
        });

        setTimeout( () => {
            dispath({
                type: HIDE_ALERT_COMPONENT
            });
        }, 5000 );

    }

    return(
        <AppContext .Provider
            value={{ 
                msg_file: state .msg_file,
                showMessage
            }}
        >
            { children }
        </AppContext .Provider>
    );
}

export default AppState;