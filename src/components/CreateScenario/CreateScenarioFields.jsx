import React from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import EnumeratedValues from "./EnumeratedValues"; // New Component

const CreateScenarioFields = ({
  country,
  scenarioParam = [],
  setScenarioParam,
}) => {
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParams = [...scenarioParam];

    if (name === "valueText") {
      updatedParams[index].valueText = value;

      if (value === "TEXT") {
        updatedParams[index].enumeratedValues = []; // Clear enumerated values
        updatedParams[index].parameterValue = ""; // Ensure parameterValue is reset
      } else if (value === "LIST") {
        updatedParams[index].parameterValue = null; // Reset single value

        // Ensure enumeratedValues has at least one default row
        if (
          !updatedParams[index].enumeratedValues ||
          updatedParams[index].enumeratedValues.length === 0
        ) {
          updatedParams[index].enumeratedValues = [
            { key: "", value: "", isPrimary: false },
          ];
        }
      }
    } else {
      updatedParams[index][name] = value;
    }

    // Ensure the country is always set correctly
    updatedParams[index].country =
      country ||
      updatedParams[index].country ||
      scenarioParam[0]?.country ||
      "";

    setScenarioParam([...updatedParams]); // Trigger re-render
  };

  const handleAddRow = () => {
    setScenarioParam((prevParams) => [
      ...prevParams,
      {
        country: country || prevParams[0]?.country || "", // Ensure country is set
        parameterType: "PREDEFINED",
        valueText: "TEXT",
        parameterName: "",
        parameterDescription: "",
        parameterValue: "",
        enumeratedValues: [],
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedParams = scenarioParam.filter((_, i) => i !== index);
    setScenarioParam(updatedParams);
  };

  return (
    <Box>
      {scenarioParam.map((param, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid #ddd" }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Field {index + 1}
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Parameter Type</InputLabel>
                <Select
                  name="parameterType"
                  value={param.parameterType}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="PREDEFINED">PREDEFINED</MenuItem>
                  <MenuItem value="USERDEFINED">USERDEFINED</MenuItem>
                  <MenuItem value="HIDDEN">HIDDEN</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Value Text</InputLabel>
                <Select
                  name="valueText"
                  value={param.valueText}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="TEXT">TEXT</MenuItem>
                  <MenuItem value="LIST">LIST</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Parameter Name"
                name="parameterName"
                value={param.parameterName}
                onChange={(e) => handleChange(index, e)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Parameter Description"
                name="parameterDescription"
                value={param.parameterDescription}
                onChange={(e) => handleChange(index, e)}
              />
            </Grid>

            {param.valueText === "TEXT" && (
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Parameter Value"
                  name="parameterValue"
                  value={param.parameterValue}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
            )}

            <Grid item xs={2}>
              {scenarioParam.length > 1 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveRow(index)}
                >
                  <RemoveCircleOutline />
                </IconButton>
              )}
              {index === scenarioParam.length - 1 && (
                <IconButton color="primary" onClick={handleAddRow}>
                  <AddCircleOutline />
                </IconButton>
              )}
            </Grid>
          </Grid>

          {param.valueText === "LIST" && (
            <EnumeratedValues
              paramIndex={index}
              scenarioParam={scenarioParam}
              setScenarioParam={setScenarioParam}
            />
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default CreateScenarioFields;
