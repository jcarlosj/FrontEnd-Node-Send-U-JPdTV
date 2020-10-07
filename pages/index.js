import React, { useContext, useEffect } from 'react';

/** Context */
import AuthContext from '../context/auth/auth.context';

/** Components */
import Layout from '../components/Layout';

/** Component */
const Index = () => {

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        {   msg, is_authenticated,
            getAuthenticatedUser
        } = authContext;

    /** Change tracking
     * Similar to componentDidMount and componentDidUpdate  */
    useEffect( () => {
        getAuthenticatedUser();
    }, [] );
    /** Extract authenticated user from token in LocalStorage */
    

    return (
        <Layout>
            <h1>Index Page</h1>
        </Layout>
    );
}

export default Index;