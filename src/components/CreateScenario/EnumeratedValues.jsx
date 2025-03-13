import React from "react";
import {
  Grid,
  TextField,
  IconButton,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const EnumeratedValues = ({ paramIndex, scenarioParam, setScenarioParam }) => {
  const handleAddEnumRow = () => {
    const updatedParams = [...scenarioParam];
    updatedParams[paramIndex].enumeratedValues.push({
      key: "",
      value: "",
      isPrimary: false,
    });
    setScenarioParam(updatedParams);
  };

  const handleRemoveEnumRow = (enumIndex) => {
    const updatedParams = [...scenarioParam];
    updatedParams[paramIndex].enumeratedValues = updatedParams[
      paramIndex
    ].enumeratedValues.filter((_, i) => i !== enumIndex);
    setScenarioParam(updatedParams);
  };

  const handleEnumChange = (enumIndex, event) => {
    const { name, value, type, checked } = event.target;
    const updatedParams = [...scenarioParam];
    updatedParams[paramIndex].enumeratedValues[enumIndex][name] =
      type === "checkbox" ? checked : value;
    setScenarioParam(updatedParams);
  };

  return (
    <Paper
      elevation={2}
      sx={{ mt: 2, p: 2, borderRadius: 2, background: "#f9f9f9" }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Enumerated Values
      </Typography>

      {scenarioParam[paramIndex].enumeratedValues.map(
        (enumValue, enumIndex) => (
          <Grid container spacing={2} alignItems="center" key={enumIndex}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Key"
                name="key"
                value={enumValue.key}
                onChange={(e) => handleEnumChange(enumIndex, e)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Value"
                name="value"
                value={enumValue.value}
                onChange={(e) => handleEnumChange(enumIndex, e)}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPrimary"
                    checked={enumValue.isPrimary}
                    onChange={(e) => handleEnumChange(enumIndex, e)}
                  />
                }
                label="Is Primary"
              />
            </Grid>
            <Grid item xs={3}>
              {scenarioParam[paramIndex].enumeratedValues.length > 1 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveEnumRow(enumIndex)}
                >
                  <RemoveCircleOutline />
                </IconButton>
              )}
              {enumIndex ===
                scenarioParam[paramIndex].enumeratedValues.length - 1 && (
                <IconButton color="primary" onClick={handleAddEnumRow}>
                  <AddCircleOutline />
                </IconButton>
              )}
            </Grid>
          </Grid>
        )
      )}
    </Paper>
  );
};

export default EnumeratedValues;
