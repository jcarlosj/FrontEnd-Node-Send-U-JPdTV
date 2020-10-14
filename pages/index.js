import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

/** Context */
import AuthContext from '../context/auth/auth.context';
import AppContext from '../context/app/app.context';

/** Components */
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

/** Component */
const Index = () => {

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        { getAuthenticatedUser } = authContext,
        appContext = useContext( AppContext ),
        { msg_file, url } = appContext;

    /** Change tracking
     * Similar to componentDidMount and componentDidUpdate  */
    useEffect( () => {
        const token = localStorage .getItem( 'rns_token' );

        if( token ) {
            getAuthenticatedUser();     //  Extract authenticated user from token in LocalStorage
        }
        
    }, [] );

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                
                { url 
                    ?   <>
                            <p className="text-center my-5">
                                <span className="text-red-700 font-bold ">Tu URL es: </span>{ `${ process .env .frontendURL }/links/${ url }` }
                            </p>
                            <button
                                type="button"
                                className="bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold my-5"
                                onClick={ () => navigator .clipboard .writeText( `${ process .env .frontendURL }/links/${ url }` ) }
                            >Copiar Enlace</button>
                        </>
                    :   <>
                            { msg_file && <Alert /> }
                
                            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

                                <Dropzone />
                                
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
                        </>
                }

            </div>
        </Layout>
    );
}

export default Index;