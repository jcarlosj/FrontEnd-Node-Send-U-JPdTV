import React, { useState } from 'react';
import Layout from '../../components/Layout';

/** Dependencies */
import clientAxios from '../../config/axios';

export async function getServerSideProps({ params }) {      //  Destructuracion de props
    console .log( 'params', params );

    const
        { link } = params,
        response = await clientAxios .get( `/api/links/${ link }` );

    console .info( 'getServerSideProps', response .data );

    return { 
        props: {                        //  Propiedad Obligatoria: Se pasara al componente dinamico, es decir como props a LinkDynamicComponent
            link: response .data        //  Nombre de la propiedad contenida en los props que se pasa al Componente Dinámico, en este caso [link].js 
        } 
    };
    /**
     *  - getStaticProps(Generación estática): 
     *      recupera datos en el momento de la compilación .
     *  - getStaticPaths(Generación estática): 
     *      especifique rutas dinámicas para la representación previa en función de los datos.
     *  - getServerSideProps(Representación del lado del servidor): 
     *      obtenga datos en cada solicitud .
     */
}

/** Next.js pre-renderizará estáticamente todas las rutas especificadas */
export async function getServerSidePaths() {

    const response = await clientAxios .get( `/api/links` );

    console .info( 'getServerSidePaths', response .data );
    
    return { 
        paths: response .data .links .map( link => ({   //  Propiedad Obligatoria: Hará disponible rutas estáticas a cada propiedad que se le pase
            params: { link: link .url } //  Iteracion de parametros para generar cada ruta estática
        })),
        fallback: false                 //  Propiedad Obligatoria: true muestra componente aun si no se encuentra la ruta, false obtendrá un 404
    };
    /** 
     * Las rutas estáticas generadas seran de acuerdo a los datos que provee la API
     */
}
  

/** Dynamic Component */
const LinkDynamicComponent = ({ link }) => {    //  Propiedad establecida para los props del componente

    const 
        [ hasPassword, setHasPassword ] = useState( link .hasPassword ),
        [ password, setPassword ] = useState( '' );

    console .info( 'LinkDynamicComponent', link );      //  Despliegue publico de datos (link es la propiedad definida para el prop) del componente dinámico
    console .info( 'hasPassword', hasPassword );

    /** Verify Password */
    const verifyPassword = async event => {
        event .preventDefault();
        
        try {
            const
                data = { password }, 
                response = await clientAxios .post( `/api/links/${ link .url }`, data );
                
            console .log( 'verifyPassword', response );    
            setHasPassword( response .data .hasPassword );
        } 
        catch( error ) {
            console .error( error .response .data .msg );
        }

        
    }

    return (
        <Layout>

            { hasPassword
                ?   <> 
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">

                            <p className="py-3 px-8">Enlace protegido, ingresa la contraseña a continuación</p>

                                <form 
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ ev => verifyPassword( ev ) }
                                >
                                    
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Contraseña</label>
                                        <input 
                                            id="password"
                                            type="password" 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Contraseña de acceso"
                                            value={ password }
                                            onChange={ ev => setPassword( ev .target .value ) }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold"
                                        >Validar Contraseña...</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </>
                :   <>
                        <h1 className="text-4xl text-center text-gray-700">Archivo disponible</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={ `${ process .env .backendURL }/api/files/${ link .name }` }
                                className="bg-red-400 text-center px-10 py-3 rounded font-bold text-white cursor-pointer"
                            >Descarga aquí</a>
                        </div>
                    </>
            }

            
        </Layout>
    );
}

export default LinkDynamicComponent;