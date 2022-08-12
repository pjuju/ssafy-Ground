import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

const FilterRadio = ({ radio, setRadio }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <RadioGroup
          row
          value={radio}
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        >
          <FormControlLabel value="all" label="전체" control={<Radio />} />
          <FormControlLabel
            value="custom"
            label="직접 선택"
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
};

export default FilterRadio;
