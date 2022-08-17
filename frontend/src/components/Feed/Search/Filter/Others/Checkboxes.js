import { ThemeProvider } from "@emotion/react";
import { FormControlLabel, Checkbox, Grid, FormControl } from "@mui/material";

import theme from "components/common/theme.js";

const Checkboxes = ({ xs, radio, values, setValues }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <Grid className="filter-select__checkboxes" container>
          {values.map((value, index) => (
            <Grid item xs={xs} key={value.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      const valueCopy = [...values];
                      // update checkbox value
                      valueCopy[index].checked = e.target.checked;
                      // update local state
                      setValues(valueCopy);
                    }}
                    type="checkbox"
                    checked={radio === "all" ? true : value.checked}
                    value={value.id}
                  />
                }
                label={value.value}
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>
    </ThemeProvider>
  );
};

export default Checkboxes;
