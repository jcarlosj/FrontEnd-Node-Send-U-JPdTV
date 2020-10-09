import React, { useState, useCallback } from 'react';

/** Dependencies */
import { useDropzone } from 'react-dropzone';
import clientAxios from '../config/axios';

const Dropzone = () => {

    const onDrop = useCallback(     //  Devuelve un callback memorizado que solo cambia si una de las dependencias ha cambiado.
        async ( acceptedFiles ) => {
            console .log( 'Archivo subido...', acceptedFiles );

            const formData = new FormData();                              //  Crea Objeto de tipo Form-Data para subir archivos
            formData .append(
                'file',                 // Key
                acceptedFiles[ 0 ]      // Informacion del archivo
            );

            const response = await clientAxios .post( '/api/files', formData );     //  Petición al BackEnd para subir el archivo

            console .log( 'onDrop', response .data );
        },
        [ acceptedFiles ]
    );
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });    //  Extract properties from Dropzone

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

            <ul>{ files }</ul>

            <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
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
        </div>
    );
}

export default Dropzone;