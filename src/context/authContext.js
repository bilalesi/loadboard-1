
import React, { useContext, createContext, useReducer } from 'react';
import { useLocation, Navigate } from 'react-router-dom';


const initialState = {
    user: {},
    is_authenticated: false,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                is_authenticated: action.payload.is_authenticated || false,
                error: action.payload.error,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                is_authenticated: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
const AuthStateProvider = createContext();
const AuthDispatchProvider = createContext();

function AuthProvider({ children }) {
    const [userAuthData, dispatch] = useReducer(reducer, initialState);
    console.log('userAuthData', userAuthData)
    return(
        <AuthStateProvider.Provider value={userAuthData}>
            <AuthDispatchProvider.Provider value={dispatch}>
                {children}
            </AuthDispatchProvider.Provider>
        </AuthStateProvider.Provider>
    )
}

function useAuthState() {
    const context = useContext(AuthStateProvider);
    if (!context) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}
function useAuthDispatch() {
    const context = useContext(AuthDispatchProvider);
    if (!context) {
        throw new Error('useAuthDispatch must be used within a AuthProvider');
    }
    return context;
}

function RequireAuth({ children }) {
    let auth = useAuthState();
    let location = useLocation();

    if (!auth.user && !auth.is_authenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function AlreadyAuthenticated({ children }) {
    let auth = useAuthState();
    let location = useLocation();

    if (auth.user && auth.is_authenticated) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/dashboard" replace />;
    }

    return children;
}


export { useAuthState, useAuthDispatch, AlreadyAuthenticated, RequireAuth };
export default AuthProvider;