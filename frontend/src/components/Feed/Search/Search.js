import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useForm, Controller } from "react-hook-form";
import "styles/Search/Search.scss";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import FilterModal from "./FilterModal";

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
    label={<Typography sx={{ fontSize: "0.9rem" }}>{item.label}</Typography>}
    control={<Radio size="small" />}
  />
));

function Search() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm({
    defaultValues: { standard: "", word: "", date: "" },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid className="search-inner" item>
      <form>
        <Grid className="search-inner__top" container direction="column">
          <Grid className="top__search-bar" container justifyContent="center">
            <Grid xs={2} item>
              <FormControl size="small" sx={{ minWidth: "100%" }}>
                <InputLabel id="search-standard" className="top__search-label">
                  기준 선택
                </InputLabel>
                <Controller
                  name="standard"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="search-standard"
                      label="기준 선택"
                      {...field}
                    >
                      <MenuItem className="top__search-dropdown" value="board">
                        게시글
                      </MenuItem>
                      <MenuItem className="top__search-dropdown" value="user">
                        유저
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid className="top__search-field-wrapper" xs={6} item>
              <Controller
                name="word"
                control={control}
                render={({ field }) => (
                  <GrTextField
                    className="top__search-field"
                    size="small"
                    label="검색어 입력"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid xs={1} item>
              <GrButton
                className="top__search-button"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                검색
              </GrButton>
            </Grid>
            <Grid xs={1} item>
              <Grid container justifyContent="center">
                <IconButton onClick={handleOpen}>
                  <FilterAltIcon />
                </IconButton>
                <FilterModal open={open} handleClose={handleClose} />
              </Grid>
            </Grid>
          </Grid>
          {
            !(
              <Grid container>
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
            )
          }
        </Grid>
      </form>
    </Grid>
  );
}

export default Search;
