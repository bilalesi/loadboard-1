import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

function UserManagement() {
  const [siteTabTitle, setSiteTabTitle] = useState(false);

  useEffect(() => {
    setSiteTabTitle('User Management - Loadboard');

    return () => {/* */}
  }, []);

  return (
    <div className="user-management main-container">
      <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="User Management" />
      </Helmet>
      <div className="container">
        <div className="col align-items-center my-5">
          <div className="col-lg-7">
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">User Management</h1>
            <p>
              At some point we'll have a form for creating and editing users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;