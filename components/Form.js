import React from 'react';

/** Component */
const Form = () => {
    return( 
        <div className="w-full mt-20">
            <label className="text-lg text-gray-800">Eliminar tras:</label>
            <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-4 px-8 rounded leading-none focus:outline-none focus:border-gray-500">
                <option value="" selected disabled>Seleccione...</option>
                <option value="1">1 desgarga</option>
                <option value="3">3 desgargas</option>
                <option value="5">5 desgargas</option>
                <option value="10">10 desgargas</option>
                <option value="20">20 desgargas</option>
            </select>
        </div>
    );
}

export default Form;