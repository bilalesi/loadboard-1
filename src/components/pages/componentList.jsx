import React, { useState, useEffect } from "react";
//import truckPicture from '../../assets/images/truck.jpg';
import LoadDataService from "../../services/loads";
import {Helmet} from "react-helmet";
import {
  DataCardBlock,
  TableBlock
} from "../../components";

function ComponentListPreview() {

  const [dashboardTable, setDashboardTableData] = useState({table:{},data:[{}],loading:true});
  const [bidboardTable, setBidboardTableData] = useState({table:{},data:[{}],loading:true});
  //const [tablecfg, setTableCfg] = useState([]);
  //const [table2cfg, setTable2Cfg] = useState([]);
  const [siteTabTitle, setSiteTabTitle] = useState('Component List - Loadboard');
  //const [isTableLoading, setIsTableLoading] = useState(true);
  //const [isTable2Loading, setIsTable2Loading] = useState(true);
  const controller = new AbortController();

  useEffect(() => {
    //debugger;
    retrieveBidBoardLoads();
    retrievedashboardLoads();

    return () => {controller.abort();}

  }, []);
  async function retrievedashboardLoads() {
    return await LoadDataService.getAll({'report':'Dashboard',controller:controller})
      .then(response => {
        //debugger;
        //console.log(response.data);
        var loadData = response.data;
        var reportConfig = response.reports[0];
        setDashboardTableData({table:reportConfig,data:loadData,loading:false});
        //debugger;
      })
      .catch(e => {
        console.log(e);
      });
    };
  async function retrieveBidBoardLoads() {
      return await LoadDataService.getAll({'report':'Bid Board Active Loads',controller:controller})
      .then(response => {
        debugger;
        var loadData = response.data;
        var reportConfig = response.reports[0];
        //setTable2Cfg(reportConfig);
        setBidboardTableData({table:reportConfig,data:loadData,loading:false});
        //setIsTable2Loading(false);
        //debugger;
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  return (
    <div className="componentListPreview main-container">
      <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="Component List" />
      </Helmet>
      <div className="container">
        <div className="col align-items-center my-5">
          <div className="">
            <div className="content content-header">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
                <div className="flex-grow-1 mb-1 mb-md-0">
                  <h1 className="font-weight-light">Component List Preview</h1>
                  <h2 className="h6 fw-medium fw-medium text-muted mb-0">
                    Browse a collection of the different styles used by components.
                  </h2>
                </div>
              </div>
            </div>
            <div className="content content-body">
              <div className="row">
                <DataCardBlock 
                  CardType="LinkBottom"
                  CounterNumber='5'
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
              <div className="row">
                <DataCardBlock
                  CardType="Barebones"
                  logoClassText='fa fa-plus'
                  CounterLabel='Submit Something!'
                  logoClassContainerCSS='fs-2 fw-semibold text-success'
                  CounterLabelCSS='fw-medium fs-sm text-success mb-0'
                />
                <DataCardBlock
                  CardType="Barebones"
                  CounterNumber='3'
                  CounterLabel='Running Low!'
                  CounterNumberCSS='fs-2 fw-semibold text-danger'
                  CounterLabelCSS='fw-medium fs-sm text-danger mb-0'
                />
                <DataCardBlock
                  CardType="Barebones"
                  CounterNumber='###'
                  CounterLabel='PLEASE_DEFINE!'
                  CounterNumberCSS='fs-2 fw-semibold text-danger'
                  CounterLabelCSS='fw-medium fs-sm text-danger mb-0'
                />
                <DataCardBlock
                  CardType="Barebones"
                  CounterNumber={['Spare some ', <div className="text-danger font-weight-bold">change?</div>]}
                  CounterLabel="Who's there?"
                  CounterNumberCSS='fs-5 fw-semibold text-warning'
                  CounterLabelCSS='fw-medium fs-sm text-danger mb-0'
                />
              </div>
              
              <TableBlock data={bidboardTable.data} tableconfig={bidboardTable.table} loading={bidboardTable.loading} />
              <hr className="mb-5 mt-5"></hr>
              <TableBlock data={dashboardTable.data} tableconfig={dashboardTable.table} loading={dashboardTable.loading} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentListPreview;