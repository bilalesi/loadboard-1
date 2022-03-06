import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
//import truckPicture from '../../assets/images/truck.jpg';
import {
  DataCardBlock,
  TableBlock
} from "..";

function ViewLoad() {
  const [siteTabTitle, setSiteTabTitle] = useState(false);

  useEffect(() => {
    setSiteTabTitle('Edit Load - Loadboard');

    return () => {/* */}
  }, []);

  return (
    <div className="view-load main-container">
      <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="Edit Load" />
      </Helmet>
      <div className="container">
        <div className="col align-items-center my-5">
          <div className="">
            <div className="content content-header">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
                <div className="flex-grow-1 mb-1 mb-md-0">
                  <h1 className="font-weight-light">Load</h1>
                  <h2 className="h6 fw-medium fw-medium text-muted mb-0">
                    View and edit load.
                  </h2>
                </div>
              </div>
            </div>
            <div className="content content-body">
              <div className="block block-rounded">
                <div className="block-header block-header-default">
                <h3 className="block-title">Load Data</h3>
                </div>
                <div className="block-content">
                  Span Span Span Span Span Span Span Span Span Span Span 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLoad;