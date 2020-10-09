/** Types */
import { 
    SHOW_ALERT_COMPONENT,
    HIDE_ALERT_COMPONENT,
    SUCESSFUL_FILE_UPLOAD,
    ERRONEOUS_FILE_UPLOAD,
    LINK_SUCCESSFULLY_CREATED,
    ERROR_CREATING_LINK
} from '../../types';

/** Reducer are the functions that will modify the State  */
const AuthReducer = ( state, action ) => {
    switch( action .type ) {
        case SHOW_ALERT_COMPONENT:
            return {
                ...state,
                msg_file: action .payload
            }
        case HIDE_ALERT_COMPONENT:
            return {
                ...state,
                msg_file: null
            }
        case SUCESSFUL_FILE_UPLOAD:
            return {
                ...state,
                msg_file: action .payload .msg_file,
                name: action .payload .name,
                original_name: action .payload .original_name
            }
        case ERRONEOUS_FILE_UPLOAD:
            return {
                ...state,
                msg_file: action .payload
            }
        default:
            return state;
    }
}

export default AuthReducer;