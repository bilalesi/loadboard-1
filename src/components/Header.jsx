import React  from "react";
import { useAuthState } from "../context/authContext";
import { API_URL } from "../constant";


function Header(e) {
  const authState = useAuthState();
  function toggleSidebar(e) {
    e.target.closest('main').classList.toggle('sidebar-mini');
    e.target.closest('main').querySelector('.siteBranding > .siteTitle').classList.toggle('hidden');
    var el = document.querySelectorAll('nav.navigation .nav-main-link-name');

    for (var i = 0; i < el.length; i++) {
        var currentEl = el[i];
        currentEl.classList.toggle('hidden');
    }
  }
  const _handleLogoutClick = () => {
    // Logout using Microsoft passport api
    // Set authenticated state to false in the HomePage
    console.log("Logout", API_URL);
    window.open(`${API_URL}/api/auth/logout`, "_self");
  };
  return (
    <header id="page-header">
      <div className="content-header">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="row w-100">
            <div className="col-sm">
              <button type="button" className="btn btn-sm btn-alt-secondary me-2" data-toggle="layout" onClick={toggleSidebar}>
                <i className="fa fa-fw fa-bars"></i>
              </button>

            </div>
            {/*<button type="button" className="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block" data-toggle="layout" onClick={toggleSidebar}>
              <i className="fa fa-fw fa-ellipsis-v"></i>
            </button>*/}
            {/* <button type="button" className="btn btn-sm btn-alt-secondary d-lg-none" data-toggle="layout" data-action="header_search_on">
              <i className="fa fa-fw fa-search"></i>
            </button> */}
            <div className="col-sm d-flex align-items-center justify-content-end">
              { authState.is_authenticated &&
                  <button type="button" className="btn btn-danger" onClick={_handleLogoutClick}>Logout</button>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;