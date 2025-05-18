import React, { useState } from "react";

const DebounceSearch = () => {
  const [state, setState] = useState({
    details: { address: { vill: "netari" } },
  });
  const debounce = (func) => {
    let timeout = null;
    return (...arg) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        return func(...arg);
      }, 1000);
    };
  };

  const handleDebounceSearch = (e) => {
    console.log(e.target.value);
  };
  // const handleSearch = debounce(handleDebounceSearch);
  console.log(state);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setState((prev) => {
            prev.details.address.vill = e.target.value;
            return prev;
          });
        }}
      />
      <div>{state}</div>
    </div>
  );
};

export default DebounceSearch;
