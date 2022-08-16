import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@emotion/react";

import moment from "moment";
import theme from "components/common/theme.js";


export default function StartDatePicker({ radio, startDate, setStartDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DatePicker
          value={startDate}
          inputFormat={"yyyy-MM-dd"}
          maxDate={new Date()}
          onChange={(newValue) => {
            setStartDate(moment(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} className="date-picker" size="small" />
          )}
          closeOnSelect={true}
          readOnly={radio !== "custom" ? true : false}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
