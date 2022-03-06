import React, { useState, useEffect } from "react";
//import truckPicture from '../../assets/images/truck.jpg';
import LoadDataService from "../../services/loads";
import { Puff } from 'react-loading-icons';
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {
  DataCardBlock,
  TableBlock,
  TableHeaders,
  TableRows
} from "../../components";

function Dashboard() {
  /* useEffect(() => {
    document.title = process.env.REACT_APP_SITE_TITLE + " - Dashboard"
  }, []); */
  //
  const [siteTabTitle, setSiteTabTitle] = useState('Dashboard - Loadboard');
  //
  const [loads, setVisibleLoads] = useState('');
  const [currentIndex, setCurrentLoadIndex] = useState(-1);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const controller = new AbortController();

  useEffect(() => {

    setIsTableLoading(true);
    if (loads.length < 1) {
      retrieveLoads();
    }
    return () => {controller.abort();}
  }, []);
  const retrieveLoads = async () => {
    return LoadDataService.getAll({'report':null,'filters':{sort:"id,desc"},controller:controller})
      .then(response => {
        console.log(response.data);
        var loadData = response;
        setVisibleLoads(loadData);
        setIsTableLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveLoads();
    setActiveLoad(null);
    setCurrentLoadIndex(-1);
  };
  const setActiveLoad = (load, index) => {
    setCurrentLoadIndex(index);
  };
  //
  //
  //
  return (
      <div className="Dashboard main-container">
        <Helmet defer={false}>
            <title>{siteTabTitle}</title>
            <meta name="description" content="Dashboard" />
        </Helmet>
        <div className="container">
          <div className="col align-items-center my-5">
            <div className="">
              <div className="content content-header">
                <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
                  <div className="flex-grow-1 mb-1 mb-md-0">
                    <h1 className="font-weight-light">Dashboard</h1>
                    <h2 className="h6 fw-medium fw-medium text-muted mb-0">
                          Welcome <a className="fw-semibold" href="/user-profile">John Doe</a>, everything looks great.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="content content-body">
                <div className="row">
                  <DataCardBlock 
                    CardType="LinkBottom"
                    CounterNumber='9'
                    CounterLabel='Loads on Bid Board'
                    expandDataLabel='View all Bid Board Loads'
                    logoClassText='far fa-gem fs-3 text-primary'
                  />
                  <DataCardBlock
                    CardType="LinkBottom"
                    CounterNumber='8'
                    CounterLabel='Loads waiting for tender acceptance' 
                    expandDataLabel='View all Tendered Loads'
                    logoClassText='far fa-hourglass fs-3 text-primary'
                  />
                  <DataCardBlock
                    CardType="LinkBottom"
                    CounterNumber='12'
                    CounterLabel='Test Card'
                    expandDataLabel='View all test please enjoy'
                    logoClassText='fas fa-cloud fs-3 text-primary'
                  />
                  <DataCardBlock
                    CardType="Barebones"
                    contBlockCSS='bb-card block block-rounded block-link-shadow text-center d-flex flex-column position-relative justify-content-center h-100'
                    CounterNumber='Look at me!'
                    CounterLabel='Test Card'
                  />
                </div>
                {/* table */}
                <div className="block block-rounded">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">All Active Bid Board Loads</h3>
                  </div>
                  <div className="block-content">
                    <div className="table-responsive">
                      <table className="table table-borderless table-striped table-vcenter">
                        <thead>
                          <tr>
                            <th className="text-center">Load OID</th>
                            <th className="d-md-table-cell">First Item Weight</th>
                            <th className="d-md-table-cell">First Event</th>
                            <th className="d-sm-table-cell text-center">Is Active on Bidboard</th>
                            <th>Special Instructions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {isTableLoading ? (
                            <tr>
                              <td colSpan='5'className="text-center pt-4 pb-4">
                                <Puff stroke="#0d6efd" strokeOpacity={.645} speed={1} />
                                <span className="d-block">Loading...</span>
                              </td>
                            </tr>
                          ) : (
                          loads.data && loads.data.map((load, index) => (
                              index < 300 &&
                              <tr
                                className={
                                  (index === currentIndex ? "active" : "")
                                }
                                //onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}
                              >
                                <td><a href={'/load?oid=' + load.oid + '&ref=loadboard'}>{load.oid}</a></td>
                                <td>{load.data.bidData.Items[0].Weight} {load.data.bidData.Items[0].WeightUOM}</td>
                                <td className="d-md-table-cell fs-sm">{load.data.bidData.Plan[0].Type}: {load.data.bidData.Plan[0].Location.City}, {load.data.bidData.Plan[0].Location.State} {load.data.bidData.Plan[0].Location.Country}</td>
                                <td className="d-sm-table-cell text-center fs-sm">{load.data.bidData.isBidActive == true ? <span className='badge bg-success'>Available</span> :<span className='badge bg-danger'>Unavailable</span>}</td>
                                <td>{load.data.bidData.SpecialInstructions}</td>
                              </tr>
                            ))
                          )
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/*--fill me --*/}
                {/*<TableBlock>
                  <TableHeaders columns={[]} columnsToHide= {[]} />
                  <TableRows  />
                </TableBlock>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;