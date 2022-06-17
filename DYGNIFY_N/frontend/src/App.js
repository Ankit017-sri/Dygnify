import React, { useState } from "react";
import "./App.css";
import { PersonalDetails } from "./Components/PersonalDetails";
import { BusinessDetails } from "./Components/BusinessDetails";
import { LoanDetails } from "./Components/LoanDetails";
import Tabs from "./Components/Tabs";
import TabSelected from "./Components/TabSelected";

function App() {
  const [selected, setSelected] = useState("Personal");
  const [userId, setUserId] = useState(0);

  return (
    <div className="app">
      <Tabs
        tabs={["Personal", "Business", "Loan"]}
        selected={selected}
        setSelected={setSelected}
      >
        <TabSelected isSelected={selected === "Personal"}>
          <PersonalDetails setUserId={setUserId} />
        </TabSelected>

        <TabSelected isSelected={selected === "Business"}>
          <BusinessDetails userId={userId} />
        </TabSelected>

        <TabSelected isSelected={selected === "Loan"}>
          <LoanDetails userId={userId} />
        </TabSelected>
      </Tabs>
    </div>
  );
}

export default App;
