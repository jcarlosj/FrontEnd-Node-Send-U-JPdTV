import Layout from '../../components/Layout';

export async function getStaticProps({ params }) {
    console .log( 'params', params );

    return { 
        props: {                //  Propiedad Obligatoria: Se pasara al componente dinamico, es decir como props a LinkDynamicComponent
            link: params .link  //  Esta propiedad debe tener el mismo nombre del archivo que define el Componente Dinámico, en este caso [link].js 
        } 
    };
    /**
     * Debe usar getStaticProps si:
     *  1. Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario. 
     *  2. Los datos provienen de un CMS sin cabeza.
     *  3. Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
     *  4. La página debe estar previamente renderizada (para SEO) y ser muy rápida: getStaticPropsgenera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para mejorar el rendimiento.
     */
}

/** Next.js pre-renderizará estáticamente todas las rutas especificadas */
export async function getStaticPaths() {

    const links = [         //  Simula obtener rutas de una peticion a una API
        { url: 'ewiufwywe' },
        { url: 'dsjdhgtrd' },
        { url: 'oishbtsde' }
    ];
    
    return { 
        paths: links .map( link => ({   //  Propiedad Obligatoria: Hará disponible rutas estáticas a cada propiedad que se le pase
            params: { link: link .url } //  Iteracion de parametros para generar cada ruta estática
        })),
        fallback: false                 //  Propiedad Obligatoria: true muestra componente aun si no se encuentra la ruta, false obtendrá un 404
    };
    /** 
     * Las rutas estáticas generadas para este caso serán:
     *  - http://localhost:3000/links/ewiufwywe
     *  - http://localhost:3000/links/dsjdhgtrd
     *  - http://localhost:3000/links/oishbtsde
     */
}
  

/** Dynamic Component */
const LinkDynamicComponent = ({ link }) => {

    return (
        <Layout>
            <h1>Component with Dynamic Routing <strong>[{ link }].js</strong></h1>
        </Layout>
    );
}

export default LinkDynamicComponent;