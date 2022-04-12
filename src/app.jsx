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
import axios from "axios";
export default function App() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let result = (
          await axios.get(`${API_URL}/api/auth/check`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
        ).data;
		console.log("result", result);
        if (result.authenticated) {
          dispatch({ type: "LOGIN", payload: { user: result.user, is_authenticated: true, error: null }, });
        } else {
          dispatch({ type: "LOGIN", payload: { error: "Failed to authenticate user", is_authenticated: false, user: null, }, });
        }
      } catch (error) {
       	 dispatch({ type: "LOGIN", payload: { error: error.response.data, is_authenticated: false, user: null, }, });
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      {loading && <div>Loading ...</div>}
      {!loading && (
        <Router>
          {authState.is_authenticated && (
            <React.Fragment>
              <Navigation />
              <Header />
            </React.Fragment>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <AlreadyAuthenticated>
                  {" "}
                  <Login />{" "}
                </AlreadyAuthenticated>
              }
            />
            <Route
              path="/login"
              element={
                <AlreadyAuthenticated>
                  {" "}
                  <Login />{" "}
                </AlreadyAuthenticated>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  {" "}
                  <Dashboard />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/Integrations"
              element={
                <RequireAuth>
                  {" "}
                  <Integrations />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/user-profile"
              element={
                <RequireAuth>
                  {" "}
                  <UserProfile />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/user-management"
              element={
                <RequireAuth>
                  {" "}
                  <UserManagement />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/component-list"
              element={
                <RequireAuth>
                  {" "}
                  <ComponentListPreview />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="/load"
              element={
                <RequireAuth>
                  {" "}
                  <ViewLoad />{" "}
                </RequireAuth>
              }
            />
            <Route path="*" element={<Error_404 />} />
          </Routes>
        </Router>
      )}
    </React.Fragment>
  );
}
