import '../styles/globals.css';
import AuthState from '../context/auth/auth.state';

function MyApp({ Component, pageProps }) {
    return (
        <AuthState>
            <Component {...pageProps} />
        </AuthState>
    );
}

export default MyApp;
