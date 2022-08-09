import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

export default function StartDatePicker({ startDate, setStartDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DatePicker
          label="시작 날짜"
          value={startDate}
          inputFormat={"yyyy/MM/dd"}
          maxDate={new Date()}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="date-picker date-picker__startDate"
              size="small"
            />
          )}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
