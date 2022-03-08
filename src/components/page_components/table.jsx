import { React, useMemo } from "react";
import { Puff } from "react-loading-icons";
import TableBlock from "./table-block";
function Container({ children, title, tableconfig, data, loading }) {
  console.info(`Container is rendering....`);

  return (
    <div className="table-container">
      {loading && (
        <div className="block block-rounded">
          <div className="block-header block-header-default">
            <h3 className="block-title"></h3>
          </div>
          <div className="loadingContainer">
            <Puff stroke="#0d6efd" strokeOpacity={0.645} speed={1} />
            <span className="d-block">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <TableBlock tableconfig={tableconfig} data={data} title={title} />
      )}
      {children}
    </div>
  );
}

export default Container;
