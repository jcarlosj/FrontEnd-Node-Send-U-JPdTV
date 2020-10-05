import React from 'react';
import Layout from '../components/Layout';

/** Component */
const CreateAccount = () => {
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>
                
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            
                            <div className="mb-4">
                                <label 
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="name"
                                >Nombre</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nombre del usuario"
                                />
                            </div>
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
                                />
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
                                />
                            </div>
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold"
                                >Crear Cuenta</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default CreateAccount;