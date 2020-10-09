import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

/** Context */
import AuthContext from '../context/auth/auth.context';

/** Components */
import Layout from '../components/Layout';

/** Component */
const Index = () => {

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        { getAuthenticatedUser } = authContext;

    /** Change tracking
     * Similar to componentDidMount and componentDidUpdate  */
    useEffect( () => {
        getAuthenticatedUser();     //  Extract authenticated user from token in LocalStorage
    }, [] );

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                    <div className="md:flex-1 mb-3 mx-2 mt-6 lg:mt-0">
                        <p>Dropzone</p>
                    </div>
                    <div className="md:flex-1 mb-3 mx-2 mt-6 lg:mt-0">
                        <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma segura y privada</h2>
                        <p className="">
                            <span className="text-red-500 font-bold">React Node</span> Send permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despues de ser descargado.
                        </p>
                        <p>Asi que puedes mantener lo que compartes en privado y asegurarte que tus cosas no permanezcan en línea para siempre.</p>
                        <p>
                            <Link href="/create-account">
                                <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Index;