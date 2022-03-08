import React from "react";

const headerClasses = (column) => {
  return !column.HeaderProps ? "" : column.HeaderProps;
};

function TableColumnHeaders({ headerGroups }) {
  //console.log(headerClasses)
  return (
    <thead>
      {
        // Loop over the header rows
        headerGroups &&
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps(headerClasses(column), {
                      style: { width: column.width },
                    })}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
      }
    </thead>
  );
}

export default TableColumnHeaders;
