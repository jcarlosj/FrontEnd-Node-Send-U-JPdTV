/** Types */
import { 
    SUCCESSFUL_REGISTRATION, 
    ERRONEOUS_REGISTRATION,
    SUCCESSFUL_LOGIN,
    ERRONEOUS_LOGIN,
    AUTHENTICATED_USER,
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
        case SUCCESSFUL_LOGIN: 
            localStorage .setItem( 'rns_token', action .payload );
            return {
                ...state,
                token: action .payload,
                is_authenticated: true
            };
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action .payload,
                is_authenticated: true
            };
        case HIDE_ALERT_COMPONENT: 
            return {
                ...state,
                msg: null
            };
        default:
            return state;
    }
}

export default AuthReducer;