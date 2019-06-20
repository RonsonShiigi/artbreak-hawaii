import React, { useState } from "react";
import Gallery from "../../Gallery";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InvoiceHistory from "../../InvoiceHistory/invoiceHistory";

function Dashtabs() {
  function TabContainer(props) {
    return <div className="tab-container">{props.children}</div>;
  }
  const [index, onChange] = useState(0);

  return (
    <div className="tabsdiv">
      <Tabs value={index} onChange={(e, val) => onChange(val)}>
        <Tab label="Recents" disableRipple />
        <Tab label="Favorites" disableRipple />
        <Tab label="My Orders" disableRipple />
      </Tabs>
      {index === 0 && (
        <TabContainer>
          This is where my recents would go... IF I HAD ANY
        </TabContainer>
      )}
      {index === 1 && (
        <TabContainer>
          <Gallery />
        </TabContainer>
      )}
      {index === 2 && (
        <TabContainer>
          <InvoiceHistory />
        </TabContainer>
      )}
    </div>
  );
}

export default Dashtabs;
