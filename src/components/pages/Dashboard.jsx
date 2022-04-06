import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
//import truckPicture from '../../assets/images/truck.jpg';
import LoadDataService from "../../services/loads";
import { Puff } from 'react-loading-icons';
import {Helmet} from "react-helmet";
import { SocketContext } from '../../context/socket'
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
  const [siteTabTitle] = useState('Dashboard - Loadboard');
  //
  const [dashboardTable, setDashboardTableData] = useState({table:{},data:[{}],loading:true});
  const [activeBidsCardComponentData, setActiveBidsCardComponentData] = useState({CardType:"LinkBottom",CounterNumber:"",CounterLabel:"Loads on Bid Board",expandDataLabel:"View all Bid Board Loads",logoClassText:"far fa-gem fs-3 text-primary",loading:true});

  const socket = useContext(SocketContext);

  var DashboardTableContext = useRef(dashboardTable);

  useEffect(() => {
    DashboardTableContext.current = dashboardTable;
  }, [dashboardTable]);

  useEffect(() => {
    //
    //
    const handleTableInitialize = async (tableData) => {
      console.log('tableinitialize',tableData,DashboardTableContext.current);
      var loadData = tableData.data;
      var reportConfig = tableData.reports[0];
      setDashboardTableData({table:reportConfig,data:loadData,loading:false,initialized:true,report:tableData.reports});
    };
    //
    //
    const handleReturnDataTableUpdate = async (tableData) => {
        console.log('tableData',{table:tableData.reports[0], data:tableData.data, loading:false, report:{_id: tableData.reports[0]._id, name: tableData.reports[0].name}});
        setDashboardTableData({table:tableData.reports[0], data:tableData.data, loading:false, report:{_id: tableData.reports[0]._id, name: tableData.reports[0].name}});
        console.log('table update processed',tableData);
    };
    //
    //
    var handleTableUpdate = () => {
      console.log('---> update request received');
      //get request to update from server
      //--
      //request new data from server below
      console.log('table',dashboardTable, DashboardTableContext.current);
      debugger;
      socket.emit("table-update",DashboardTableContext.current);
    };

    const handleLeaveChannel = (feed) => {
      socket.emit("unsubscribeFeed",feed);
      socket.removeAllListeners("initialize");
      socket.removeAllListeners("update");
      socket.removeAllListeners('table-update');
      socket.removeAllListeners('table-request-update')
    };
    //
    //
    const handleJoinChannel = (feed) => {
      debugger;
      switch (feed.type){
        case "table":
          socket.emit("subscribeFeed", {...feed, "initialize": true });
          socket.on("initialize", handleTableInitialize);
          socket.on("table-update",handleReturnDataTableUpdate);
        break;
        case "card":
          //
        break;
      }
    };

    
    socket.on("table-request-update",handleTableUpdate);

    handleJoinChannel({ report: 'Dashboard', type: 'table' });

    return () => {
      //socketio
      handleLeaveChannel({ report: 'Dashboard', type: 'table' });
    }
  }, []);

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
                    CardType={activeBidsCardComponentData.CardType}
                    CounterNumber='2'
                    CounterLabel={activeBidsCardComponentData.CounterLabel}
                    expandDataLabel={activeBidsCardComponentData.expandDataLabel}
                    logoClassText={activeBidsCardComponentData.logoClassText}
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
                {dashboardTable.data && 
                <TableBlock data={dashboardTable.data} tableconfig={dashboardTable.table} loading={dashboardTable.loading} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;