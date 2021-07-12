import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from "./hookes/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css';
import {Loader} from "./components/Loader";

function App() {
    const {token, login, logout, userID, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userID, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
