import '../styles/globals.css';
import AuthState from '../context/auth/auth.state';
import AppState from '../context/app/app.state';

function MyApp({ Component, pageProps }) {
    return (
        <AuthState>
            <AppState>
                <Component { ...pageProps } />
            </AppState>
        </AuthState>
    );
}

export default MyApp;
