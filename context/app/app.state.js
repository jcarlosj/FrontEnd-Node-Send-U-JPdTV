import React, { useReducer } from 'react';

/** Context */
import AppContext from './app.context';
import AppReducer from './app.reducer';

/** Dependencies */
import clientAxios from '../../config/axios';

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
            msg_file: null,
            name: '',
            original_name: ''
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

    /** Upload file to server */
    const uploadFile = async ( formData, nameFile ) => {

        try {
            const response = await clientAxios .post( '/api/files', formData );     //  Petición al BackEnd para subir el archivo

            console .log( 'uploadFile', response .data );

            dispath({
                type: SUCESSFUL_FILE_UPLOAD,
                payload: {
                    name: response .data .file,
                    original_name: nameFile
                }
            });
        } 
        catch( error ) {
            console .error( error );
        }
    }

    return(
        <AppContext .Provider
            value={{ 
                msg_file: state .msg_file,
                name: state .name,
                original_name: state .original_name,
                showMessage,
                uploadFile
            }}
        >
            { children }
        </AppContext .Provider>
    );
}

export default AppState;