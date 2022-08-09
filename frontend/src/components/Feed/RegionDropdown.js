import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

function RegionDropdown() {
  const [region, setRegion] = React.useState("");
  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  return (
    <Grid container direction="row">
      <Grid item>
        <div>지역</div>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">지역</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="region"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default RegionDropdown;
