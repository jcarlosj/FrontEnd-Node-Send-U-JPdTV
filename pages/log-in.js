import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

/** Context */
import AuthContext from '../context/auth/auth.context';

/** Dependencies */
import { useFormik } from 'formik';
import * as Yup from 'yup';

/** Components */
import Layout from '../components/Layout';
import Alert from '../components/Alert';

/** Component */
const LogIn = () => {

    const router = useRouter();

    /** Access to the State and Context functions */
    const 
        authContext = useContext( AuthContext ),
        {   msg, is_authenticated,
            logIn 
        } = authContext;

    /** Form validation */
    const formik = useFormik({
        initialValues: {        //  Initial default values of Formik fields
            email: '',
            password: ''
        },
        /** Create a data Schema to create validation rules using Yup */
        validationSchema: Yup .object({
            email: Yup 
                    .string() 
                    .email( 'No es un email válido' ) 
                    .required( 'El email es requerido' ),
            password: Yup 
                        .string()
                        .required( 'La contraseña es requerida' )
        }),
        onSubmit: data => {
            console .log( 'Sending', data );
            logIn( data );                      // Execute Auth Context Function 
        }
    });

    /** Change tracking
     * Similar to componentDidMount and componentDidUpdate  */
    useEffect( () => {
        if( is_authenticated ) {
            router .push( '/' );
        }
    }, [ is_authenticated ] );

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar sesión</h2>
                
                { msg && <Alert /> }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={ formik .handleSubmit }
                        >
                            
                            <div className="mb-4">
                                <label 
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="email"
                                >Email</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email del usuario"
                                    value={ formik .values .email }
                                    onChange={ formik .handleChange }
                                    onBlur={ formik .handleBlur }
                                />
                                { formik .touched .email && formik .errors .email 
                                    ?   <div className="my-2 bg-gray-200 border-l-4 border-red-400 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ formik .errors .email }</p>
                                        </div> 
                                    :  null
                                }
                            </div>
                            <div className="mb-4">
                                <label 
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Contraseña</label>
                                <input 
                                    id="password"
                                    type="password" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Contraseña del usuario"
                                    value={ formik .values .password }
                                    onChange={ formik .handleChange }
                                    onBlur={ formik .handleBlur }
                                />
                                { formik .touched .password && formik .errors .password 
                                    ?   <div className="my-2 bg-gray-200 border-l-4 border-red-400 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ formik .errors .password }</p>
                                        </div> 
                                    :  null
                                }
                            </div>
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold"
                                >Iniciar sesión</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default LogIn;