import { React, useMemo } from "react";
import {
  parseJSON,
  format,
  formatDistance,
  subDays,
  distanceInWordsToNow,
} from "date-fns";

import convert, { allMeasures } from "convert-units";
import { useTable, useAsyncDebounce } from "react-table";
import Table from "./table-component";

function TableBlock({ tableconfig, data, title }) {
  const columns = useMemo(
    () =>
      tableconfig.table.col.map(function (column) {
        //debugger;
        if (column.path.indexOf("isBidActive") > -1) {
          column.HeaderProps = { className: "text-center" };
          column.CellProps = { className: "d-sm-table-cell text-center fs-sm" };
          column.Cell = (props) => {
            let classes =
              "badge " + (props.value === true ? "bg-success" : "bg-danger");
            return (
              <span className={classes}>
                {props.value === true ? "Available" : "Unavailable"}
              </span>
            );
          };
        } else if (column.path.indexOf("PlannedDate") > -1) {
          column.HeaderProps = { className: "text-center" };
          column.CellProps = { className: "d-sm-table-cell text-center fs-sm" };
          column.Cell = (props) => {
            let planDate = parseJSON(
              props.value,
              "yyyy-mm-ddTHH:mm:ss.XX",
              new Date()
            );
            let planDateDistance = formatDistance(planDate, new Date(), {
              addSuffix: true,
            });
            //debugger;
            if (
              format(planDate, "MM/dd/yyyy") ===
              format(new Date(), "MM/dd/yyyy")
            ) {
              planDateDistance = "Today";
            }
            let classBold = planDateDistance === "Today" ? "fw-bold" : "";

            return (
              <div>
                <span className={["text-muted", classBold].join(" ")}>
                  {format(planDate, "MM/dd/yyyy")}
                </span>
                <small className={["d-block text-muted", classBold].join(" ")}>
                  {planDateDistance}
                </small>
              </div>
            );
          };
        }
        //debugger;
        else if (column.path[0].indexOf("Weight") > -1) {
          column.HeaderProps = { className: "text-center" };
          column.CellProps = { className: "d-sm-table-cell text-center fs-sm" };
          column.Cell = (props) => {
            var weightValue = parseFloat(props.value[0]).toLocaleString(
              "en-US"
            );
            var weightUOM = props.value[1];
            var oppositeUOM = weightUOM == "lb" ? "kg" : weightUOM;
            var oppositeWeight = convert(props.value[0])
              .from(weightUOM)
              .to(oppositeUOM)
              .toFixed(2);
            oppositeWeight = parseFloat(oppositeWeight).toLocaleString("en-US");
            //debugger;
            return (
              <div>
                <small className="d-block text-muted">
                  <span>{weightValue + " " + weightUOM}</span>
                  <span className="d-block">
                    ({oppositeWeight + " " + oppositeUOM})
                  </span>
                </small>
              </div>
            );
          };
        } else if (column.path[0].indexOf("Contact.Contact") > -1) {
          column.HeaderProps = { className: "text-center" };
          column.CellProps = { className: "d-sm-table-cell text-center fs-sm" };
          column.Cell = (props) => {
            //console.log(props.value);
            var ContactName =
                props.value !== null
                  ? props.value[0] != null
                    ? props.value[0]
                    : ""
                  : "",
              ContactPhone =
                props.value !== null
                  ? props.value[1] != null
                    ? props.value[1]
                    : ""
                  : "",
              ContactEmail =
                props.value !== null
                  ? props.value[2] != null
                    ? props.value[2]
                    : ""
                  : "";
            //debugger;
            return (
              <div>
                {ContactName && <small className="h6">{ContactName}</small>}{" "}
                {(ContactPhone || ContactEmail) && (
                  <small className="d-block text-muted">
                    (<a href={`tel:+${ContactPhone}`}>{ContactPhone}</a>
                    {ContactPhone.length > 0 && ContactEmail.length > 0 && (
                      <span> | </span>
                    )}
                    <a href={`mailto:${ContactEmail}`}>{ContactEmail}</a>)
                  </small>
                )}
              </div>
            );
          };
        } else if (column.path.indexOf("loadNumber") > -1) {
          //column.HeaderProps = { className:'text-center' };
          column.CellProps = { className: "d-sm-table-cell fs-sm" };
          column.Cell = (props) => {
            //debugger;
            return (
              <div>
                <small className="h6 text-muted">{props.value}</small>
              </div>
            );
          };
        }
        return column;
      }),
    []
  );
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
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

  //

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

  //
  //
  return (
    <Table
      tableconfig={tableconfig}
      title={title}
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
}

export default TableBlock;
