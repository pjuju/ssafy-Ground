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
import { useForm, Controller } from "react-hook-form";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

const date = [
  { value: "whole", label: "전체" },
  { value: "today", label: "오늘" },
  { value: "week", label: "1주일" },
  { value: "month", label: "1개월" },
  { value: "year", label: "1년" },
  { value: "custom", label: "직접 입력" },
];

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
  const [interest, setInterest] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm({
    defaultValues: { word: "", date: "" },
  });

  const onSubmit = (data) => {
    const searchData = {
      word: data.word,
    };
    if (standard === "board") {
      searchData.date = data.date;
    }
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
              <Controller
                name="word"
                control={control}
                render={({ field }) => (
                  <SearchBar
                    handleOpen={handleOpen}
                    onSubmit={handleSubmit(onSubmit)}
                    standard={standard}
                    field={field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <FilterModal open={open} handleClose={handleClose} />
          {standard === "board" && (
            <Grid container justifyContent="end">
              <FormControl>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      {dateRadio}
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
      </form>
    </Grid>
  );
}

export default Search;
