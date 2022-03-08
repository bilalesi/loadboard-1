import React from "react";

function TableOptions() {
  return (
    <div className="block-options">
      <div className="dropdown">
        <button
          type="button"
          className="btn-block-option"
          id="dropdown-ecom-filters"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filters <i className="fa fa-angle-down ms-1"></i>
        </button>
        <div
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdown-ecom-filters"
        >
          <a
            className="dropdown-item d-flex align-items-center justify-content-between"
            href="/#"
          >
            New
            <span className="badge bg-success rounded-pill">260</span>
          </a>
          <a
            className="dropdown-item d-flex align-items-center justify-content-between"
            href="/#"
          >
            Out of Stock
            <span className="badge bg-danger rounded-pill">24</span>
          </a>
          <a
            className="dropdown-item d-flex align-items-center justify-content-between"
            href="/#"
          >
            All
            <span className="badge bg-primary rounded-pill">14503</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TableOptions;
