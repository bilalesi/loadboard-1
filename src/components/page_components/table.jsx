import { React, useMemo } from "react";
import { useTable, useAsyncDebounce } from "react-table";
import { parseJSON, format, formatDistance, subDays, distanceInWordsToNow } from 'date-fns';
import convert , { allMeasures } from 'convert-units';
import { Puff } from 'react-loading-icons';

function Container({ children, title, tableconfig, data, loading }) {

    function TableBlock() {
        //
        //
        //const [isTableLoading, setIsTableLoading] = useState(false);
        //const [loads, setVisibleLoads] = useState([]);
        //const [col, setColumns] = useState([]);

        /* useEffect(async () => {
            //setVisibleLoads(tbldata);
            //setColumns(tblcolumns);
            debugger;
            //setIsTableLoading(true);
            //if (loads.length < 1) {
            //    retrieveLoads();
            //}
            return () => {}
        }, []); */

        var tableColumns = tableconfig.table.col.map(function(column){
            //debugger;
            if ( column.path.indexOf("isBidActive") > -1 )
            {
                column.HeaderProps = { className:'text-center' };
                column.CellProps = { className:'d-sm-table-cell text-center fs-sm' };
                column.Cell = (props) => {
                    var classes = 'badge ' + (props.value === true ? "bg-success" : "bg-danger");
                    return (
                        <span className={classes}>
                        { props.value === true ? "Available" : "Unavailable" }
                        </span>
                    );
                }
            }
            else if ( column.path.indexOf("PlannedDate") > -1 )
            {
                column.HeaderProps = { className:'text-center' };
                column.CellProps = { className:'d-sm-table-cell text-center fs-sm' };
                column.Cell = (props) => {
                    let planDate = parseJSON(props.value,'yyyy-mm-ddTHH:mm:ss.XX', new Date());
                    let planDateDistance = formatDistance(
                        planDate,
                        new Date(),
                        { addSuffix: true }
                    );
                    //debugger;
                    if ( format(planDate,"MM/dd/yyyy") === format(new Date(),"MM/dd/yyyy") )
                    {
                        planDateDistance = "Today"
                    }
                    let classBold = planDateDistance === "Today" ? "fw-bold":"";
                    
                    return (
                        <div>
                            <span className={['text-muted',classBold].join(' ')}>{format(planDate, 'MM/dd/yyyy')}</span>
                            <small className={['d-block text-muted',classBold].join(" ")}>{planDateDistance}</small>
                        </div>
                    );
                }
            }
            //debugger;
            else if ( column.path[0].indexOf("Weight") > -1 )
            {
                column.HeaderProps = { className:'text-center' };
                column.CellProps = { className:'d-sm-table-cell text-center fs-sm' };
                column.Cell = (props) => {
                    var weightValue = parseFloat(props.value[0]).toLocaleString("en-US");
                    var weightUOM = props.value[1];
                    var oppositeUOM = weightUOM == "lb" ? "kg": weightUOM;
                    var oppositeWeight = convert(props.value[0]).from(weightUOM).to(oppositeUOM).toFixed(2);
                    oppositeWeight = parseFloat(oppositeWeight).toLocaleString("en-US");
                    //debugger;
                    return (
                        <div>
                            <small className="d-block text-muted"><span>{weightValue + " " + weightUOM}</span><span className="d-block">({oppositeWeight + " " + oppositeUOM})</span></small>
                        </div>
                    );
                }
            }
            else if ( column.path[0].indexOf("Contact.Contact") > -1 )
            {
                column.HeaderProps = { className:'text-center' };
                column.CellProps = { className:'d-sm-table-cell text-center fs-sm' };
                column.Cell = (props) => {
                    //console.log(props.value);
                    var ContactName = props.value !== null ? props.value[0] != null ? props.value[0] : "" : "",
                        ContactPhone = props.value !== null ? props.value[1] != null ? props.value[1] : "" : "",
                        ContactEmail = props.value !== null ? props.value[2] != null ? props.value[2] : "" : "";
                    //debugger;
                    return (
                        <div>
                            {ContactName && <small className="h6">{ContactName}</small>} {(ContactPhone || ContactEmail) && <small className="d-block text-muted">(<a href={`tel:+${ContactPhone}`}>{ContactPhone}</a>{ ContactPhone.length > 0 && ContactEmail.length > 0 &&  <span> | </span>}<a href={`mailto:${ContactEmail}`}>{ContactEmail}</a>)</small>}
                        </div>
                    );
                }
            }
            else if ( column.path.indexOf("loadNumber") > -1 )
            {
                //column.HeaderProps = { className:'text-center' };
                column.CellProps = { className:'d-sm-table-cell fs-sm' };
                column.Cell = (props) => {
                    //debugger;
                    return (
                        <div>
                            <small className="h6 text-muted">{props.value}</small>
                        </div>
                    );
                }
            }
            return column;
        });

        var columns = useMemo( () => tableColumns, tableColumns);
        const tableInstance = useTable({ columns, data });
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = tableInstance
        //
        function TableOptions() {
            
            return (
                <div className="block-options">
                    <div className="dropdown">
                    <button type="button" className="btn-block-option" id="dropdown-ecom-filters" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filters <i className="fa fa-angle-down ms-1"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-ecom-filters">
                        <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                        New
                        <span className="badge bg-success rounded-pill">260</span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                        Out of Stock
                        <span className="badge bg-danger rounded-pill">24</span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                        All
                        <span className="badge bg-primary rounded-pill">14503</span>
                        </a>
                    </div>
                    </div>
                </div>
            )
        }

        function TableColumnHeaders() {
            function headerClasses(column){ return !column.HeaderProps ? "" : column.HeaderProps};
            //console.log(headerClasses)
            return (
                <thead>
                    {// Loop over the header rows
                    headerGroups && headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                            // Apply the header cell props
                            <th {...column.getHeaderProps(headerClasses(column),{
                                style: { width: column.width }
                            })}>
                            {// Render the header
                            column.render('Header')}
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
            )
        }
        
        function TableBody() {

            return (
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                    rows && rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                            row.cells.map(cell => {
                            // Apply the cell props
                            return (
                                <td {...cell.getCellProps(cell.column.CellProps)}>
                                {// Render the cell contents
                                cell.render('Cell')}
                                </td>
                            )
                            })}
                        </tr>
                        )
                    })}
                </tbody>
                /*<tbody>
                    {loads.map( load => (
                        <TableRows load={load} />
                    ))}
                </tbody>*/
            )
        }

        /* function TableRows({load}) {
            useEffect(() => {
                console.log('data');
                console.log(load);
                debugger;
            
            }, []);
            return (
                <tr key={load._id}>
                    <td>
                        {load.oid}
                    </td>
                    <td className="d-sm-table-cell text-center fs-sm">{load.data.bidData.isBidActive === true ? <span className='badge bg-success'>Available</span> :<span className='badge bg-danger'>Unavailable</span>}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        } */
        
        function Table() {
            
            return (
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{tableconfig.name.length < 1 ? title : tableconfig.name }</h3>
                        <TableOptions />
                    </div>
                    <div className="block-content">
                        <form action="/getloads" method="GET" onSubmit= {(function(){return false;})}>
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
                            <table className="table table-borderless table-striped table-vcenter" {...getTableProps()}>
                                <TableColumnHeaders />
                                <TableBody />
                            </table>
                        </div>
                    </div>
                </div>
            )
            

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
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                            New
                            <span className="badge bg-success rounded-pill">260</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                            Out of Stock
                            <span className="badge bg-danger rounded-pill">24</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
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
                                        <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="javascript:void(0)" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
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
                                        <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="javascript:void(0)" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
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
                                        <a className="btn btn-sm btn-alt-danger js-bs-tooltip-enabled" href="javascript:void(0)" data-bs-toggle="tooltip" title="" data-bs-original-title="Delete">
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
        //
        //
        return (
            <Table />
        );
    }
    return (
        <div className="table-container">
            { loading &&
            <div className="block block-rounded">
                <div className="block-header block-header-default">
                <h3 className="block-title"></h3>
                </div>
                <div className="loadingContainer">
                <Puff stroke="#0d6efd" strokeOpacity={.645} speed={1} />
                <span className="d-block">Loading...</span>
                </div>
            </div>
            }
            { !loading &&
            <TableBlock />
            }
            {children}
        </div>
    );
}

export default Container;