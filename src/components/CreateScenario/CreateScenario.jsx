import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { AddCircleOutline, Edit, Visibility } from "@mui/icons-material";
import CreateScenarioFields from "./CreateScenarioFields";

const CreateScenario = ({
  countryList = ["India", "Spain"],
  initialFormValues,
  scenarioType,
}) => {
  const defaultFormValues = {
    country: "",
    scenarioName: "",
    scenarioDesc: "",
    scenarioParam: [
      {
        parameterType: "PREDEFINED",
        valueText: "TEXT",
        parameterName: "",
        parameterDescription: "",
        parameterValue: "",
        country: "",
        enumeratedValues: [],
      },
    ],
  };

  const [form, setForm] = useState(initialFormValues || defaultFormValues);
  const [scenarioParam, setScenarioParam] = useState(form.scenarioParam);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialFormValues) {
      setForm(initialFormValues);
      setScenarioParam(
        initialFormValues.scenarioParam.map((param) => ({
          ...param,
          country: initialFormValues.country,
        }))
      );
    }
  }, [initialFormValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      setScenarioParam((prevParams) =>
        prevParams.map((param) => ({ ...param, country: value }))
      );
    }
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <IconButton color="primary" onClick={handleOpen}>
        {scenarioType === "CREATE" && <AddCircleOutline />}
        {scenarioType === "EDIT" && <Edit />}
        {scenarioType === "VIEW" && <Visibility />}
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {scenarioType === "CREATE"
            ? "Create New Scenario"
            : scenarioType === "EDIT"
            ? "Edit Scenario"
            : "View Scenario"}
        </DialogTitle>
        <DialogContent>
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

            <CreateScenarioFields
              country={scenarioParam.country}
              scenarioParam={scenarioParam}
              setScenarioParam={setScenarioParam}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {scenarioType !== "VIEW" && (
            <>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
              <Button color="secondary" variant="contained">
                Save for Later
              </Button>
            </>
          )}
          <Button onClick={handleClose} color="default" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateScenario;
