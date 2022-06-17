import React from "react";

const Tabs = (props) => {
  return (
    <div>
      <ul className="nav nav-tabs">
        {props.tabs.map((tab) => {
          return (
            <li className="nav-item" key={tab}>
              <a
                className={
                  tab === props.selected ? "nav-link active" : "nav-link"
                }
                onClick={() => props.setSelected(tab)}
                style={{ cursor: "pointer" }}
              >
                {tab}
              </a>
            </li>
          );
        })}
      </ul>
      {props.children}
    </div>
  );
};

export default Tabs;
