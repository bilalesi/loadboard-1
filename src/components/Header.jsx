import React from "react";

function Header(e) {
  function toggleSidebar(e) {
    e.target.closest('main').classList.toggle('sidebar-mini');
    e.target.closest('main').querySelector('.siteBranding > .siteTitle').classList.toggle('hidden');
    var el = document.querySelectorAll('nav.navigation .nav-main-link-name');

    for (var i = 0; i < el.length; i++) {
        var currentEl = el[i];
        currentEl.classList.toggle('hidden');
    }
  }
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
        </div>
      </div>
    </header>
  );
}

export default Header;