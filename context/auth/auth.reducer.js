import { AUTHENTICATED_USER } from '../../types';

/** Reducer are the functions that will modify the State  */
const AuthReducer = ( state, action ) => {
    switch( action .type ) {
        case AUTHENTICATED_USER:
            return{
                ...state,
                user: action .payload
            };
        default:
            return state;
    }
}

export default AuthReducer;