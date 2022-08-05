import {
  Grid,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  MenuItem,
} from "@mui/material";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./Filter/FilterModal";
import SearchBar from "./SearchBar";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";
import StartDatePicker from "./Filter/StartDatePicker";
import EndDatePicker from "./Filter/EndDatePicker";
import { age, date, gender, interest, location } from "./initData";

const dateRadio = date.map((item, index) => (
  <FormControlLabel
    className="top__date-select"
    key={index}
    value={item.value}
    label={<Typography sx={{ fontSize: "0.8rem" }}>{item.label}</Typography>}
    control={<Radio size="small" />}
  />
));

function Search() {
  const [standard, setStandard] = useState("board");
  const [data, setData] = useState({
    interest: interest,
    gender: gender,
    age: age,
    location: location,
  });
  const [word, setWord] = useState("");
  const [dateRange, setDateRange] = useState("whole");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState(["all", "all", "all", "all"]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let searchData = {};

    if (standard === "board") {
      searchData = { ...data };
      searchData.startDate = startDate;
      searchData.endDate = endDate;
    }

    searchData.word = word;

    console.log(searchData);
  };

  return (
    <Grid className="search-inner" item>
      <form>
        <Grid className="search-inner__top" container direction="column">
          <Grid container justifyContent="space-around">
            <Grid xs={2} item>
              <FormControl sx={{ minWidth: "100%", height: "100%" }}>
                <ThemeProvider theme={theme}>
                  <Select
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                    value={standard}
                    onChange={(e) => {
                      setStandard(e.target.value);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <MenuItem value="board">게시글</MenuItem>
                    <MenuItem value="user">유저</MenuItem>
                  </Select>
                </ThemeProvider>
              </FormControl>
            </Grid>
            <Grid xs={9} item>
              <SearchBar
                handleOpen={handleOpen}
                onSubmit={onSubmit}
                standard={standard}
                word={word}
                setWord={setWord}
              />
            </Grid>
          </Grid>
          <FilterModal
            open={open}
            handleClose={handleClose}
            data={data}
            setData={setData}
            radio={radio}
            setRadio={setRadio}
          />
          {standard === "board" && (
            <>
              <Grid className="top__date-picker" container justifyContent="end">
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
              </Grid>
              {dateRange === "custom" && (
                <Grid
                  className="top__date-picker"
                  container
                  justifyContent="end"
                >
                  <StartDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                  />
                  <EndDatePicker
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </form>
    </Grid>
  );
}

export default Search;
