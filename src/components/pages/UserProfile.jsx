import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useAuthState } from "../../context/authContext";

function UserProfile() {
  const [siteTabTitle, setSiteTabTitle] = useState(false);
  const { user } = useAuthState();
  useEffect(() => {
    setSiteTabTitle('User Profile - Loadboard');

    return () => {/* */}
  }, []);

  return (
    <div className="user-profile main-container">
      <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="User Profile" />
      </Helmet>
      <div className="container">
        <div className="col align-items-center my-5">
          <div className="col-lg-7">
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">User Profile</h1>
            <p>
              At some point we'll get data from Microsoft loaded here and forms to edit what we have stored for your account.
            </p>
          </div>
        </div>
        <div>
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;