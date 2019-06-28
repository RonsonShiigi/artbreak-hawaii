import React from "react";
import "./cover.css";

function Cover() {
  return (
    <div className="cover-holder">
      <div className="cover-back" />
      <div className="glitch-cover" data-text="ARTBREAK.">
        ARTBREAK
        <b>
          <i>!</i>
        </b>
      </div>
      <div className="stmt">An empowering mission statement goes here.</div>
    </div>
  );
}

export default Cover;
