import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

function Integrations() {

  const [siteTabTitle, setSiteTabTitle] = useState(false);

  useEffect(() => {
    setSiteTabTitle('Integrations - Loadboard');

    return () => {/* */}
  }, []);

  return (
    <div className="integrations main-container">
      <Helmet defer={false}>
          <title>{siteTabTitle}</title>
          <meta name="description" content="Integrations" />
      </Helmet>
      <div className="container">
        <div className="col align-items-center my-5">
          <div className="col-lg-7">
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Integrations</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Integrations;