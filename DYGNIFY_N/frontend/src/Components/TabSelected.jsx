import React from "react";

const TabSelected = (props) => {
  return <>{props.isSelected ? <div>{props.children}</div> : null}</>;
};

export default TabSelected;
