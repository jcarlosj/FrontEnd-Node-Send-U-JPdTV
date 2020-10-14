import React, { useState } from 'react';

/** Component */
const Form = () => {

    // Define State
    const [ hasPassword, setHasPassword ] = useState( false );

    return( 
        <div className="w-full mt-20">
            <div className="my-2">
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-4 px-4 rounded leading-none focus:outline-none focus:border-gray-500">
                    <option value="" selected disabled>Seleccione...</option>
                    <option value="1">1 desgarga</option>
                    <option value="3">3 desgargas</option>
                    <option value="5">5 desgargas</option>
                    <option value="10">10 desgargas</option>
                    <option value="20">20 desgargas</option>
                </select>
            </div>
            <div className="my-2">
                <input 
                    type="checkbox" 
                    onChange={ () => setHasPassword( ! hasPassword ) }
                />
                <label className="text-lg text-gray-800 ml-2">Proteger con contraseña</label>
                { hasPassword
                    ?   <input 
                            type="password" 
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        />
                    :   null
                }
            </div>
        </div>
    );
}

export default Form;