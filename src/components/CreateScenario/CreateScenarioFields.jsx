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
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const CreateScenarioFields = ({ scenarioParam = [], setScenarioParam }) => {
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParams = [...scenarioParam];
    updatedParams[index][name] = value;
    setScenarioParam(updatedParams);
  };

  const handleAddRow = () => {
    setScenarioParam([
      ...scenarioParam,
      {
        parameterType: "",
        valueText: "",
        parameterName: "",
        parameterDescription: "",
        parameterValue: "",
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
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={2}>
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
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
              margin="normal"
              label="Parameter Name"
              name="parameterName"
              value={param.parameterName}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Parameter Description"
              name="parameterDescription"
              value={param.parameterDescription}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              margin="normal"
              label="Parameter Value"
              name="parameterValue"
              value={param.parameterValue}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>

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
      ))}

      {/* Show Add button initially if there are no rows */}
      {scenarioParam.length === 0 && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <IconButton color="primary" onClick={handleAddRow}>
              <AddCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CreateScenarioFields;
