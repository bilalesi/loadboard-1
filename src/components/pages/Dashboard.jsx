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
import { useAuthState } from "../../context/authContext";

function Dashboard() {
  const { user } = useAuthState();
  let userFullname = String(user.lastName).toUpperCase() + " " + `${String(user.firstName).charAt(0).toUpperCase()}${String(user.firstName).slice(1)}`;
  const [siteTabTitle, setSiteTitle] = useState('Dashboard - Loadboard');
  //
  const [dashboardTable, setDashboardTableData] = useState({table:{},data:[{}],loading:true});
  const [activeBidLoadsTable, setactiveBidLoadsTableData] = useState({table:{},data:[{}],loading:true});
  const [activeBidsCardComponentData, setActiveBidsCardComponentData] = useState({CardType:"LinkBottom",CounterNumber:"",CounterLabel:"Loads on Bid Board",expandDataLabel:"View all Bid Board Loads",logoClassText:"far fa-gem fs-3 text-primary",loading:true});
  
  const socket = useContext(SocketContext);

  var DashboardTableContext = useRef(dashboardTable);
  var activeBidLoadsTableContext = useRef(activeBidLoadsTable);

  useEffect(() => {
    DashboardTableContext.current = dashboardTable;
    return () => {
      console.log('::updated context1::')
    }
  }, [dashboardTable.table]);

  useEffect(() => {
    activeBidLoadsTableContext.current = activeBidLoadsTable;
    return () => {
      console.log('::updated context2::')
    }
  }, [activeBidLoadsTable.table]);

  useEffect(() => {
    //
    //
    const handleTableInitialize = async (tableData) => {
      console.log('tableinitialize',tableData);
      var loadData = tableData.data;
      var reportConfig = tableData.reports[0];
      var tableprops = {table:reportConfig,data:loadData,loading:false,initialized:true,report:tableData.reports};
      switch (reportConfig.name)
      {
        case 'Dashboard':
          setDashboardTableData(tableprops);
        break;
        case 'Bid Board Active Loads':
          setactiveBidLoadsTableData(tableprops);
        break;
      }
    };
    //
    //
    const handleReturnDataTableUpdate = async (tableData) => {
        var reportConfig = tableData.reports[0];
        var tableprops = {table:reportConfig, data:tableData.data, loading:false, report:{_id: reportConfig._id, name: reportConfig.name}};
        switch (reportConfig.name)
        {
          case 'Dashboard':
            setDashboardTableData(tableprops);
          break;
          case 'Bid Board Active Loads':
            setactiveBidLoadsTableData(tableprops);
          break;
        }
        console.log('table update processed',tableData);
    };
    //
    //
    var handleTableUpdate = () => {
      console.log('---> update request received');
      //get request to update from server
      //--
      //request new data from server below
      //console.log('table',dashboardTable, DashboardTableContext.current);
      socket.emit("table-update",DashboardTableContext.current);
      socket.emit("table-update",activeBidLoadsTableContext.current);
    };

    const handleLeaveChannel = (feed) => {
      feed.map(function(table){
        socket.emit("unsubscribeFeed",table);
        socket.removeAllListeners("initialize");
        socket.removeAllListeners('table-update');
        socket.removeAllListeners('table-request-update');
      });
    };
    //
    //
    const handleJoinChannel = (feed) => {
      feed.map(function(table){
        switch (table.type){
          case "table":
            socket.emit("subscribeFeed", {...table, "initialize": true });
            socket.on("initialize", handleTableInitialize);
            socket.on("table-update",handleReturnDataTableUpdate);
          break;
          case "card":
            //
            socket.emit("subscribeFeed", {...table, "initialize": true });
            //socket.on("initialize", handleTableInitialize);
            //socket.on("card-update",handleReturnDataTableUpdate);
          break;
        }
      });
    };

    
    socket.on("table-request-update",handleTableUpdate);

    handleJoinChannel([
      { report: 'Dashboard', type: 'table' },
      { report: 'Bid Board Active Loads', type: 'table' }
    ]);

    return () => {
      //socketio
      handleLeaveChannel([
        { report: 'Dashboard', type: 'table' },
        { report: 'Bid Board Active Loads', type: 'table' }
      ]);
    }
  }, []);

  
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
                          Welcome <a className="fw-semibold" href="/user-profile">{ userFullname }</a>, everything looks great.
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
                {activeBidLoadsTable.data && 
                <TableBlock data={activeBidLoadsTable.data} tableconfig={activeBidLoadsTable.table} loading={activeBidLoadsTable.loading} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;