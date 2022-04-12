import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Integrations,
  UserProfile,
  UserManagement,
  Navigation,
  Header,
  Footer,
  Error_404,
  Login,
  ComponentListPreview,
  ViewLoad,
} from "./components";
import {
  RequireAuth,
  AlreadyAuthenticated,
  useAuthState,
  useAuthDispatch,
} from "./context/authContext";
import { API_URL } from "./constant";

export default function App() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    (async () => {
      let response = await fetch(`${API_URL}/api/auth/check`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'http://localhost:3000',
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (response.status === 200) {
        let user = (await response.json()).user;
        dispatch({
          type: "LOGIN",
          payload: {
            user: user,
            is_authenticated: true,
            error: null,
          },
        });
      } else {
        dispatch({
          type: "LOGIN",
          payload: {
            error: "Failed to authenticate user",
            is_authenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);
  return (
    <Router>
      {authState.is_authenticated && (
        <React.Fragment>
          <Navigation />
          <Header />
        </React.Fragment>
      )}
      <Routes>
          <Route path="/" element={ <AlreadyAuthenticated> <Login /> </AlreadyAuthenticated> } />
          <Route path="/login" element={ <AlreadyAuthenticated> <Login /> </AlreadyAuthenticated> } />
          <Route path="/dashboard" element={ <RequireAuth> <Dashboard /> </RequireAuth> } />
          <Route path="/Integrations" element={ <RequireAuth> <Integrations /> </RequireAuth> } />
          <Route path="/user-profile" element={ <RequireAuth> <UserProfile /> </RequireAuth> } />
          <Route path="/user-management" element={ <RequireAuth> <UserManagement /> </RequireAuth> } />
          <Route path="/component-list" element={ <RequireAuth> <ComponentListPreview /> </RequireAuth> } />
          <Route path="/load" element={ <RequireAuth> <ViewLoad /> </RequireAuth> } />
          <Route path="*" element={<Error_404 />} />
      </Routes>
    </Router>
  );
}
