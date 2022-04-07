import React, { useState, useEffect } from "react";

function Header(e) {
  const [authState, setAuthState] = useState({ authenticated : false, user: { }});
  function toggleSidebar(e) {
    e.target.closest('main').classList.toggle('sidebar-mini');
    e.target.closest('main').querySelector('.siteBranding > .siteTitle').classList.toggle('hidden');
    var el = document.querySelectorAll('nav.navigation .nav-main-link-name');

    for (var i = 0; i < el.length; i++) {
        var currentEl = el[i];
        currentEl.classList.toggle('hidden');
    }
  }
  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Microsoft login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4000/auth/microsoft", "_self");
  }
  const _handleLogoutClick = () => {
    // Logout using Microsoft passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:4000/auth/logout", "_self");
  };
  useEffect(() => {
    fetch(`http://localhost:4000/auth/check`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log('responseJson -->', responseJson)
        setAuthState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        console.log('responseJson error-->', error)
        setAuthState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }, [])
  return (
    <header id="page-header">
      <div className="content-header">
        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-sm btn-alt-secondary me-2" data-toggle="layout" onClick={toggleSidebar}>
            <i className="fa fa-fw fa-bars"></i>
          </button>
          {/*<button type="button" className="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block" data-toggle="layout" onClick={toggleSidebar}>
            <i className="fa fa-fw fa-ellipsis-v"></i>
          </button>*/}
          <button type="button" className="btn btn-sm btn-alt-secondary d-lg-none" data-toggle="layout" data-action="header_search_on">
            <i className="fa fa-fw fa-search"></i>
          </button>
          { authState.authenticated ? <button onClick={_handleLogoutClick}>Logout</button> : <button onClick={_handleSignInClick}>Login</button>}
        </div>
      </div>
    </header>
  );
}

export default Header;