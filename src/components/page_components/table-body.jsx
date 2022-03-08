import React from "react";

function TableBody({ getTableBodyProps, prepareRow, rows }) {
  return (
    <tbody {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows?.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps(cell.column.CellProps)}>
                      {
                        // Render the cell contents
                        cell.render("Cell")
                      }
                    </td>
                  );
                })
              }
            </tr>
          );
        })
      }
    </tbody>
    /*<tbody>
                  {loads.map( load => (
                      <TableRows load={load} />
                  ))}
              </tbody>*/
  );
}

export default TableBody;
