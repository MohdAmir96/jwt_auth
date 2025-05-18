import React from "react";

const InfiniteScroll = () => {
  return (
    <div
      style={{
        color: "var(--text)",
        border: "1px solid var(--border-color)",
        height: "700px",
        width: "100%",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", top: "100px", left: "0px" }}>
        test
      </div>
    </div>
  );
};

export default InfiniteScroll;
