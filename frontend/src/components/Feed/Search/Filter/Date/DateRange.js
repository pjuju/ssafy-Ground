import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import { date } from "../../initData";

const dateRadio = date.map((item, index) => (
  <FormControlLabel
    className="top__date-select"
    key={index}
    value={item.value}
    label={<Typography sx={{ fontSize: "0.8rem" }}>{item.label}</Typography>}
    control={<Radio size="small" />}
  />
));

function DateRange({dateRange, setDateRange}) {
  return (
    <FormControl>
      <ThemeProvider theme={theme}>
        <RadioGroup
          row
          value={dateRange}
          onChange={(e) => {
            setDateRange(e.target.value);
          }}
        >
          {dateRadio}
        </RadioGroup>
      </ThemeProvider>
    </FormControl>
  );
}

export default DateRange;
