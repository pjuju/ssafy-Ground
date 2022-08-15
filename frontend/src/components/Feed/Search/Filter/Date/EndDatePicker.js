import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@emotion/react";

import moment from "moment";
import theme from "components/common/theme.js";

export default function EndDatePicker({
  radio,
  startDate,
  endDate,
  setEndDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DatePicker
          value={endDate}
          inputFormat={"yyyy-MM-dd"}
          onChange={(newValue) => {
            setEndDate(moment(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} className="date-picker" size="small" />
          )}
          minDate={startDate.toDate()}
          maxDate={new Date()}
          closeOnSelect={true}
          readOnly={radio !== "custom" ? true : false}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
