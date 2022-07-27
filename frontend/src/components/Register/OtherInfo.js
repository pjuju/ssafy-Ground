import "styles/Register/RegisterPage.scss";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";

import { useState } from "react";

function OtherInfo() {
  return (
    <>
      <Grid container justifyContent="center">
        <TextField size="small" label="닉네임" />
        <Button variant="contained">중복 확인</Button>
      </Grid>
      <Grid container justifyContent="space-between">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="age-label">연령대</InputLabel>
          <Select labelId="age-label" label="연령대">
            <MenuItem value="">선택 안함</MenuItem>
            <MenuItem value={10}>10대</MenuItem>
            <MenuItem value={20}>20대</MenuItem>
            <MenuItem value={30}>30대</MenuItem>
            <MenuItem value={40}>40대</MenuItem>
            <MenuItem value={50}>50대</MenuItem>
            <MenuItem value={60}>60대 이상</MenuItem>
          </Select>
        </FormControl>
        <Divider orientation="vertical" flexItem />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}

export default OtherInfo;
