import { SUCCESSFUL_REGISTRATION } from '../../types';

/** Reducer are the functions that will modify the State  */
const AuthReducer = ( state, action ) => {
    switch( action .type ) {
        case SUCCESSFUL_REGISTRATION:
            return{
                ...state,
                msg: action .payload
            };
        default:
            return state;
    }
}

export default AuthReducer;