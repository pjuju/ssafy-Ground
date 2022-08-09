import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

function CategoryDropdown() {
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Grid container direction="row">
      <Grid item>
        <div>카테고리</div>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
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

export default CategoryDropdown;
