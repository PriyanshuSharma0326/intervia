import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkAuth() {
        try {
            const response = await axios.get(
                "http://localhost:8000/me",
                {
                    withCredentials: true,
                }
            );

            setUser(response.data.user);
            setIsAuthenticated(true);
        }
        catch(err) {
            setUser(null);
            setIsAuthenticated(false);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated,
                setIsAuthenticated,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
