import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {SocketContext, socket} from './context/socket';
import './index.css';
import {
  Dashboard,
  Integrations,
  UserProfile,
  UserManagement,
  Navigation,
  Header,
  Footer,
  Error_404,
  //Dev
  ComponentListPreview,
  ViewLoad
} from "./components";
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <SocketContext.Provider value={socket}>
      <Navigation />
      <Header />
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Integrations" element={<Integrations />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/component-list" element={<ComponentListPreview />} />
          <Route path="/load" element={<ViewLoad />} />
          <Route path='*' element={<Error_404 />} />
      </Routes>
    </SocketContext.Provider>
  </Router>,

  document.body.querySelector("main")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
reportWebVitals();
//serviceWorker.unregister();