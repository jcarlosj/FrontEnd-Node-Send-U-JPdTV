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
            link: response .data .link  //  Esta propiedad debe tener el mismo nombre del archivo que define el Componente Dinámico, en este caso [link].js 
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
const LinkDynamicComponent = ({ link }) => {

    console .info( 'LinkDynamicComponent', link );

    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Archivo disponible</h1>
            <div className="flex items-center justify-center mt-10">
                <a 
                    href={ `${ process .env .backendURL }/api/files/${ link .name }` }
                    className="bg-red-400 text-center px-10 py-3 rounded font-bold text-white cursor-pointer"
                >Descarga aquí</a>
            </div>
        </Layout>
    );
}

export default LinkDynamicComponent;