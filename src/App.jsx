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
                  countryList={countries}
                  initialFormValues={initialFormValues}
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
