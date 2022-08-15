import { FormControlLabel, Checkbox, Grid, FormControl } from "@mui/material";
import { useState } from "react";
import { useController } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

const Checkboxes = ({ options, control, name, radio, xs }) => {
  const { field } = useController({ control, name });
  const [value, setValue] = useState(options);
  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <Grid container>
          {options.map((option, index) => (
            <Grid item xs={xs} key={option.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      const valueCopy = [...value];
                      // update checkbox value
                      valueCopy[index].checked = e.target.checked;
                      // send data to react hook form
                      field.onChange(valueCopy);
                      // update local state
                      setValue(valueCopy);
                    }}
                    type="checkbox"
                    checked={radio === "all" ? true : value[index].checked}
                    value={option.id}
                  />
                }
                label={option.value}
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>
    </ThemeProvider>
  );
};

export default Checkboxes;
