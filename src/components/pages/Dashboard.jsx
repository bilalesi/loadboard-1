import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
//import truckPicture from '../../assets/images/truck.jpg';
import LoadDataService from "../../services/loads";
import { Puff } from "react-loading-icons";
import { Helmet } from "react-helmet";
import { SocketContext } from "../../context/socket";
import { motion } from "framer-motion";
import {
  DataCardBlock,
  TableBlock,
  TableHeaders,
  TableRows,
} from "../../components";

import testPayload from "../../testPayload.json";
function Dashboard() {
  const intervalId = useRef({});
  /* useEffect(() => {
    document.title = process.env.REACT_APP_SITE_TITLE + " - Dashboard"
  }, []); */
  //
  const [siteTabTitle, setSiteTabTitle] = useState("Dashboard - Loadboard");

  //
  const [dashboardTable, setDashboardTableData] = useState({
    table: {},
    data: [{}],
    loading: true,
  });

  const memoDashBoardData = useMemo(
    () => dashboardTable,
    [dashboardTable.data]
  );

  const controller = new AbortController();

  const socket = useContext(SocketContext);

  //
  //
  const handleLeaveChannel = useCallback((feed) => {
    socket.off("initialize", handleTableInitialize);
    socket.emit("unsubscribeFeed", feed);
  }, []);
  //
  //
  const handleJoinChannel = useCallback((feed) => {
    socket.emit("subscribeFeed", { ...feed, initialize: true });
    socket.on("initialize", handleTableInitialize);
  }, []);
  const handleTableInitialize = useCallback((tableData) => {
    console.log("initialize socketio table:");
    const loadData = tableData.data;
    const reportConfig = tableData.reports[0];
    setDashboardTableData({
      table: reportConfig,
      data: loadData,
      loading: false,
    });

    socket.on("update", handleTableUpdate);
  }, []);
  const handleTableUpdate = useCallback((tableData) => {
    console.log("update socketio table:");
    const loadData = tableData.data;
    const reportConfig = tableData.reports[0];
    setDashboardTableData({
      table: reportConfig,
      data: loadData,
      loading: false,
    });
  }, []);

  const simulateUpdate = () => {
    const divisor = Math.floor(Math.random() * 3) + 1;
    intervalId.current = setInterval(() => {
      testPayload.data.forEach((item, i) => {
        if (i % divisor === 0) {
          item.col6 = !item.col6;
        }
      });
      setDashboardTableData(testPayload);
    }, 10000);
  };

  useEffect(() => {
    //debugger;
    handleJoinChannel({ report: "Dashboard" });

    simulateUpdate();

    return () => {
      //axios
      controller.abort();
      //socketio
      handleLeaveChannel({ report: "Dashboard" });
    };
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
                    Welcome{" "}
                    <a className="fw-semibold" href="/user-profile">
                      John Doe
                    </a>
                    , everything looks great.
                  </h2>
                </div>
              </div>
            </div>
            <div className="content content-body">
              <div className="row">
                <DataCardBlock
                  CardType="LinkBottom"
                  CounterNumber="9"
                  CounterLabel="Loads on Bid Board"
                  expandDataLabel="View all Bid Board Loads"
                  logoClassText="far fa-gem fs-3 text-primary"
                />
                <DataCardBlock
                  CardType="LinkBottom"
                  CounterNumber="8"
                  CounterLabel="Loads waiting for tender acceptance"
                  expandDataLabel="View all Tendered Loads"
                  logoClassText="far fa-hourglass fs-3 text-primary"
                />
                <DataCardBlock
                  CardType="LinkBottom"
                  CounterNumber="12"
                  CounterLabel="Test Card"
                  expandDataLabel="View all test please enjoy"
                  logoClassText="fas fa-cloud fs-3 text-primary"
                />
                <DataCardBlock
                  CardType="Barebones"
                  contBlockCSS="bb-card block block-rounded block-link-shadow text-center d-flex flex-column position-relative justify-content-center h-100"
                  CounterNumber="Look at me!"
                  CounterLabel="Test Card"
                />
              </div>
              <TableBlock
                data={memoDashBoardData.data}
                tableconfig={memoDashBoardData.table}
                loading={memoDashBoardData.loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
