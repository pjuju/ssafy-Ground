import { Grid } from "@mui/material";
import DateRange from "./DateRange";
import EndDatePicker from "./EndDatePicker";
import StartDatePicker from "./StartDatePicker";

function SearchDatePicker({
  dateRange,
  setDateRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <>
      <Grid className="top__date-picker" container justifyContent="end">
        <DateRange dateRange={dateRange} setDateRange={setDateRange} />
      </Grid>
      {dateRange === "custom" && (
        <Grid className="top__date-picker--calendar" container>
          <StartDatePicker startDate={startDate} setStartDate={setStartDate} />
          <EndDatePicker
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
      )}
    </>
  );
}

export default SearchDatePicker;
