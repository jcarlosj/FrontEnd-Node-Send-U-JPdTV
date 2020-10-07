import clientAxios from './axios';

/** Send Token in the header using the Axios Client */
const authToken = token => {
    if( token ) {
        clientAxios .defaults .headers .common[ 'Authorization' ] = `Bearer ${ token }`;
    }
    else {
        delete clientAxios .defaults .headers .common[ 'Authorization' ];
    }
}

export default authToken;