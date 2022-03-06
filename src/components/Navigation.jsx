import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as SiteBranding } from '../assets/images/branding.svg';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="d-flex flex-column p-3 bg-dark">
        <div className="container overflow-hidden">
          <NavLink className="d-flex flex-column align-items-center mb-3 mb-md-0 me-md-auto link-light text-center siteBranding" to="/">
            <SiteBranding />
            <span className="siteTitle fs-4">{process.env.REACT_APP_SITE_TITLE}</span>
          </NavLink>
          <hr></hr>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink className="nav-link nav-main-link" to="/">
                  <i className="fas fa-tachometer-alt bi me-2 nav-main-link-icon"></i>
                  <span className="nav-main-link-name">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mb-auto nav-main-link" to="/integrations">
                <i className="fas fa-cloud bi me-2 nav-main-link-icon"></i>
                <span className="nav-main-link-name">Integrations</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mb-auto nav-main-link" to="/user-profile">
                <i className="fas fa-id-badge bi me-2 nav-main-link-icon"></i>
                <span className="nav-main-link-name">My Profile</span>
              </NavLink>
            </li>
            <li className="nav-main-heading">Manage Application</li>
            <hr className="mt-0"></hr>
            <li className="nav-item">
              <NavLink className="nav-link mb-auto nav-main-link" to="/user-management">
                <i className="fas fa-users bi me-2 nav-main-link-icon"></i>
                <span className="nav-main-link-name">User Management</span>
              </NavLink>
            </li>
            <li className="nav-main-heading">Development</li>
            <hr className="mt-0"></hr>
            <li className="nav-item">
              <NavLink className="nav-link mb-auto nav-main-link" to="/component-list">
                <i className="fas fa-swatchbook bi me-2 nav-main-link-icon"></i>
                <span className="nav-main-link-name">Component List</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;