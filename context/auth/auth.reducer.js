/** Types */
import { 
    SUCCESSFUL_REGISTRATION, 
    ERRONEOUS_REGISTRATION,
    ERRONEOUS_LOGIN,
    HIDE_ALERT_COMPONENT 
} from '../../types';

/** Reducer are the functions that will modify the State  */
const AuthReducer = ( state, action ) => {
    switch( action .type ) {
        case SUCCESSFUL_REGISTRATION:
        case ERRONEOUS_REGISTRATION :
        case ERRONEOUS_LOGIN:
            return {
                ...state,
                msg: action .payload
            };
        case HIDE_ALERT_COMPONENT: 
            return {
                ...state,
                msg: null
            }
        default:
            return state;
    }
}

export default AuthReducer;