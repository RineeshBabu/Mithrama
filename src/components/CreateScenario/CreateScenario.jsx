import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Grid,
} from "@mui/material";
import CreateScenarioFields from "./CreateScenarioFields";

const CreateScenario = ({
  countryList = ["India", "Spain"],
  initialFormValues = {
    country: "",
    scenarioName: "",
    scenarioDesc: "",
    scenarioParam: [],
  },
}) => {
  const [form, setForm] = useState(initialFormValues);
  const [scenarioParam, setScenarioParam] = useState(
    initialFormValues.scenarioParam || []
  );

  useEffect(() => {
    setForm(initialFormValues);
    setScenarioParam(initialFormValues.scenarioParam || []);
  }, [initialFormValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    return form.country && form.scenarioName.trim() && form.scenarioDesc.trim();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { ...form, scenarioParam });
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Scenario
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 2, width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Choose Country</InputLabel>
                <Select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                margin="normal"
                required
                label="Scenario Name"
                name="scenarioName"
                value={form.scenarioName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                margin="normal"
                required
                label="Scenario Desc"
                name="scenarioDesc"
                value={form.scenarioDesc}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4 }}>
            Scenario Parameters
          </Typography>

          <CreateScenarioFields
            scenarioParam={scenarioParam}
            setScenarioParam={setScenarioParam}
          />

          <Box sx={{ textAlign: "right", mt: 4 }}>
            <button type="submit">Submit</button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateScenario;
