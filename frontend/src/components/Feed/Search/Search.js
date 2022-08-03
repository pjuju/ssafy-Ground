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
  Button,
} from "@mui/material";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useForm, Controller } from "react-hook-form";
import "styles/Search/Search.scss";

import { useState } from "react";
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";

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
          <SearchBar
            handleOpen={handleOpen}
            onSubmit={handleSubmit(onSubmit)}
          />
          <FilterModal open={open} handleClose={handleClose} />
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
        </Grid>
      </form>
    </Grid>
  );
}

export default Search;
