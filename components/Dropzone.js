import React, { useState, useCallback } from 'react';

/** Dependencies */
import { useDropzone } from 'react-dropzone';
import clientAxios from '../config/axios';

const Dropzone = () => {

    const onDrop = useCallback(     //  Devuelve un callback memorizado que solo cambia si una de las dependencias ha cambiado.
        ( acceptedFiles ) => {
            console .log( 'Archivo subido...', acceptedFiles );
        },
        [ acceptedFiles ]
    );
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });    //  Extract properties from Dropzone

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-6 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
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