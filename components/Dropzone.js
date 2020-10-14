import React, { useCallback, useContext } from 'react';

/** Context */
import AppContext from '../context/app/app.context';
import AuthContext from '../context/auth/auth.context';

/** Dependencies */
import { useDropzone } from 'react-dropzone';

/** Components */
import Form from '../components/Form';

const Dropzone = () => {

    /** Access to the State and Context functions */
    const 
        appContext = useContext( AppContext ),      //  AppContext
        {   loading,
            showMessage, uploadFile, createLink
        } = appContext,
        authContext = useContext( AuthContext ),    //  AuthContext
        { is_authenticated } = authContext;

    /** Dropzone function: When the uploaded files are accepted */
    const onDropAccepted = useCallback( async ( acceptedFiles ) => {     //  Devuelve un callback memorizado que solo cambia si una de las dependencias ha cambiado.
            //console .log( 'Archivo subido...', acceptedFiles );

            const formData = new FormData();                              //  Crea Objeto de tipo Form-Data para subir archivos
            formData .append(
                'file',                 // Key
                acceptedFiles[ 0 ]      // Informacion del archivo (Nombre Original)
            );

            uploadFile( formData, acceptedFiles[ 0 ] .path );

        }, [] );

    /** Dropzone function: When uploaded files are rejected */
    const onDropRejected = () => {
        showMessage( 'Ops! No se pudo subir, el límite es de 1MB. \nObten una cuenta gratuita para subir archivos más grandes!' );
    }
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({      //  Extract properties from Dropzone
        onDropAccepted,         //  Se ejecuta cuando los archivos subidos sean aceptados
        onDropRejected,         //  Se ejecuta cuando los archivos a subir no han sido aceptados
        maxSize: 1000000        //  Regla de validacion para aceptar la subida de archivos de máximo 1MB
    });    

    /** List of uploaded files */
    const files = acceptedFiles .map( file => {

        console .log( 'file ', file );

        return(
            <li 
                key={ file .lastModified } 
                className="bg-white flex- p-3 mb-4 shadow-lg rounded"
            >
                <p className="font-bold text-xl">{ file .path }</p>
                <p className="text-sm text-gray-500">{ ( file .size / Math .pow( 1024, 2 ) ) .toFixed( 2 ) } MB</p>
            </li>
        );
    });

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-6 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">

            { acceptedFiles .length > 0 
                ?   <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>{ files }</ul>

                        { is_authenticated
                            ?   <Form />
                            :   <p className="text-center">Registrate y amplia tus opciones</p>
                        }

                        { loading 
                            ?   <p className="text-center my-10 text-gray-800 font-bold">Subiendo el archivo...</p>
                            :   <button 
                                    type="button"
                                    className="bg-blue-700 w-full py-2 rounded-lg text-white my-4 hover:bg-blue-800"
                                    onClick={ () => createLink() }
                                >Crear enlace</button>
                        }

                    </div>
                :   <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                        <input className="h-100" { ...getInputProps() } />
            
                        { isDragActive 
                            ?   <p className="text-2xl text-center text-gray-800">Muy bien, ahora suelta el archivo</p>
                            :   <div className="text-center">
                                    <p className="text-2xl text-center text-gray-600">Arrastra hasta aquí un archivo</p>
                                    <p className="text-2xl text-center text-gray-600">ó</p>
                                    <button 
                                        className="bg-blue-700 w-full py-2 rounded-lg text-white my-4 hover:bg-blue-800"
                                        type="button"
                                    >Seleccionalo para subir</button>
                                </div>
                        }

                    </div>
            }

        </div>
    );
}

export default Dropzone;