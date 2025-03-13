import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateScenario from "./components/CreateScenario/CreateScenario";

import Box from "@mui/material/Box";

// Create a component for the Home page
function Home() {
  return <h1>Home Page</h1>;
}

function App() {
  const countries = ["India", "Spain"];
  const initialFormValues = {
    country: "Spain",
    scenarioName: "Rineesh",
    scenarioDesc: "Babu",
    scenarioParam: [
      {
        parameterType: "HIDDEN",
        valueText: "LIST",
        parameterName: "aasdf1",
        parameterDescription: "asdf1",
        parameterValue: null,
        enumeratedValues: [
          { key: "123", value: "Rinee", isPrimary: true },
          { key: "1234", value: "Rineesh", isPrimary: false },
        ],
        country: "Spain",
      },
      {
        parameterType: "HIDDEN",
        valueText: "LIST",
        parameterName: "aasdf",
        parameterDescription: "asdf",
        parameterValue: null,
        enumeratedValues: [
          { key: "123", value: "Rinee", isPrimary: true },
          { key: "1234", value: "Rineesh", isPrimary: false },
        ],
        country: "Spain",
      },
    ],
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create-scenario"
            element={
              <Box sx={{ width: "100%" }}>
                <CreateScenario
                  key="create-scenario"
                  countryList={countries}
                  scenarioType={"CREATE"}
                />
                <CreateScenario
                  key="edit-scenario"
                  countryList={countries}
                  initialFormValues={initialFormValues}
                  scenarioType={"EDIT"}
                />
                <CreateScenario
                  key="view-scenario"
                  countryList={countries}
                  initialFormValues={initialFormValues}
                  scenarioType={"VIEW"}
                />
              </Box>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
