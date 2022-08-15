import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import { date } from "assets/data/initData";

const radioList = date.map((item, index) => (
  <FormControlLabel
    className="date-radio"
    key={index}
    value={item.value}
    label={<Typography sx={{ fontSize: "0.8rem" }}>{item.label}</Typography>}
    control={<Radio size="small" />}
  />
));

function DateRadio({ radio, setRadio, handleRadioChange }) {
  return (
    <FormControl fullWidth>
      <ThemeProvider theme={theme}>
        <RadioGroup
          className="date-radio__radio-group"
          row
          value={radio}
          onChange={(e) => {
            handleRadioChange(e.target.value);
          }}
        >
          {radioList}
        </RadioGroup>
      </ThemeProvider>
    </FormControl>
  );
}

export default DateRadio;
