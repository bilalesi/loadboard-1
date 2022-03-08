import React from "react";
import TableOptions from "./table-options";
import TableColumnHeaders from "./table-column-headers";
import TableBody from "./table-body";

function Table({
  tableconfig,
  title,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) {
  return (
    <div className="block block-rounded">
      <div className="block-header block-header-default">
        <h3 className="block-title">
          {tableconfig.name.length < 1 ? title : tableconfig.name}
        </h3>
        <TableOptions />
      </div>
      <div className="block-content">
        <form
          action="/getloads"
          method="GET"
          onSubmit={function () {
            return false;
          }}
        >
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-alt"
                id="one-ecom-products-search"
                name="one-ecom-products-search"
                placeholder="Search all products.."
              />
              <span className="input-group-text bg-body border-0">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </form>
        <div className="table-responsive">
          <table
            className="table table-borderless table-striped table-vcenter"
            {...getTableProps()}
          >
            <TableColumnHeaders headerGroups={headerGroups} />
            <TableBody
              rows={rows}
              getTableBodyProps={getTableBodyProps}
              prepareRow={prepareRow}
            />
          </table>
        </div>
      </div>
    </div>
  );

  /* return (
              <div className="block block-rounded">
                  <div className="block-header block-header-default">
                  <h3 className="block-title">All Products</h3>
                  <div className="block-options">
                      <div className="dropdown">
                      <button type="button" className="btn-block-option" id="dropdown-ecom-filters" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Filters <i className="fa fa-angle-down ms-1"></i>
                      </button>
                      <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-ecom-filters">
                          <a className="dropdown-item d-flex align-items-center justify-content-between" href="/#">
                          New
                          <span className="badge bg-success rounded-pill">260</span>
                          </a>
                          <a className="dropdown-item d-flex align-items-center justify-content-between" href="/#">
                          Out of Stock
                          <span className="badge bg-danger rounded-pill">24</span>
                          </a>
                          <a className="dropdown-item d-flex align-items-center justify-content-between" href="/#">
                          All
                          <span className="badge bg-primary rounded-pill">14503</span>
                          </a>
                      </div>
                      </div>
                  </div>
                  </div>
                  <div className="block-content">
                      <form action="be_pages_ecom_products.html" method="POST" onsubmit="return false;">
                          <div className="mb-4">
                          <div className="input-group">
                              <input type="text" className="form-control form-control-alt" id="one-ecom-products-search" name="one-ecom-products-search" placeholder="Search all products.." />
                              <span className="input-group-text bg-body border-0">
                                  <i className="fa fa-search"></i>
                              </span>
                          </div>
                          </div>
                      </form>
                      <div className="table-responsive">
                          <table className="table table-borderless table-striped table-vcenter">
                              <thead>
                                  <tr>
                                  <th className="text-center">ID</th>
                                  <th className="d-none d-md-table-cell">Product</th>
                                  <th className="d-none d-sm-table-cell text-center">Added</th>
                                  <th>Status</th>
                                  <th className="d-none d-sm-table-cell text-end">Value</th>
                                  <th className="text-center">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                                          <tr>
                                      <td className="text-center fs-sm">
                                      <a className="fw-semibold" href="be_pages_ecom_product_edit.html">
                                          <strong>PID.01535</strong>
                                      </a>
                                      </td>
                                      <td className="d-none d-md-table-cell fs-sm">
                                      <a href="be_pages_ecom_product_edit.html">Product #35</a>
                                      </td>
                                      <td className="d-none d-sm-table-cell text-center fs-sm">10/12/2029</td>
                                      <td>
                                      <span className="badge bg-success">Available</span>
                                      </td>
                                      <td className="text-end d-none d-sm-table-cell fs-sm">
                                      <strong>$27.00</strong>
                                      </td>
                                      <td className="text-center fs-sm">
                                      <a className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled" href="be_pages_ecom_product_edit.html" data-bs-toggle="tooltip" title="" data-bs-original-title="View">
                                          <i className="fa fa-fw fa-eye"></i>
                                      </a>
                                      <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="/#" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
                                          <i className="fa fa-fw fa-times text-danger"></i>
                                      </a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className="text-center fs-sm">
                                      <a className="fw-semibold" href="be_pages_ecom_product_edit.html">
                                          <strong>PID.01534</strong>
                                      </a>
                                      </td>
                                      <td className="d-none d-md-table-cell fs-sm">
                                      <a href="be_pages_ecom_product_edit.html">Product #34</a>
                                      </td>
                                      <td className="d-none d-sm-table-cell text-center fs-sm">20/05/2029</td>
                                      <td>
                                      <span className="badge bg-danger">Out of Stock</span>
                                      </td>
                                      <td className="text-end d-none d-sm-table-cell fs-sm">
                                      <strong>$81.00</strong>
                                      </td>
                                      <td className="text-center fs-sm">
                                      <a className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled" href="be_pages_ecom_product_edit.html" data-bs-toggle="tooltip" title="" data-bs-original-title="View">
                                          <i className="fa fa-fw fa-eye"></i>
                                      </a>
                                      <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="/#" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
                                          <i className="fa fa-fw fa-times text-danger"></i>
                                      </a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td className="text-center fs-sm">
                                      <a className="fw-semibold" href="be_pages_ecom_product_edit.html">
                                          <strong>PID.01533</strong>
                                      </a>
                                      </td>
                                      <td className="d-none d-md-table-cell fs-sm">
                                      <a href="be_pages_ecom_product_edit.html">Product #33</a>
                                      </td>
                                      <td className="d-none d-sm-table-cell text-center fs-sm">04/05/2029</td>
                                      <td>
                                      <span className="badge bg-danger">Out of Stock</span>
                                      </td>
                                      <td className="text-end d-none d-sm-table-cell fs-sm">
                                      <strong>$112,151.00</strong>
                                      </td>
                                      <td className="text-center fs-sm">
                                      <a className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled" href="be_pages_ecom_product_edit.html" data-bs-toggle="tooltip" title="" data-bs-original-title="View">
                                          <i className="fa fa-fw fa-eye"></i>
                                      </a>
                                      <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="/#" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
                                          <i className="fa fa-fw fa-times text-danger"></i>
                                      </a>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          ); */
}

export default Table;
