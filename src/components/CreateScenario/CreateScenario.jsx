import React, { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';

const CreateScenario = ({ 
  countryList = ["India", "Spain"], 
  initialFormValues = { country: '', scenarioName: '', scenarioDesc: '' } 
}) => {
  const [form, setForm] = useState(initialFormValues);

  const [errors, setErrors] = useState({
    country: false,
    scenarioName: false,
    scenarioDesc: false
  });

  useEffect(() => {
    setForm(initialFormValues);
  }, [initialFormValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setForm({
      ...form,
      [name]: value
    });

    if (value.trim() !== '') {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      country: form.country === '',
      scenarioName: form.scenarioName.trim() === '',
      scenarioDesc: form.scenarioDesc.trim() === ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', form);
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Scenario
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl 
                fullWidth 
                margin="normal" 
                required 
                error={errors.country}
              >
                <InputLabel id="country-label">Choose Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  name="country"
                  value={form.country}
                  label="Choose Country"
                  onChange={handleChange}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {errors.country && (
                  <FormHelperText>Country is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="scenarioName"
                label="Scenario Name"
                name="scenarioName"
                value={form.scenarioName}
                onChange={handleChange}
                error={errors.scenarioName}
                helperText={errors.scenarioName ? 'Scenario Name is required' : ''}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="scenarioDesc"
                label="Scenario Desc"
                name="scenarioDesc"
                value={form.scenarioDesc}
                onChange={handleChange}
                error={errors.scenarioDesc}
                helperText={errors.scenarioDesc ? 'Scenario Description is required' : ''}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateScenario;
