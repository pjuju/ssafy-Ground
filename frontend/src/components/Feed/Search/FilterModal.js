import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import GrButton from "components/common/GrButton";
import GrSelect from "components/common/GrSelect";
import { useState } from "react";

function FilterModal({ open, handleClose }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "0.5px solid #888",
    p: 4,
  };

  const labelStyle = {
    color: "black",
    fontWeight: "600",
  };

  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Grid className="filter-modal" container direction="column">
          <Grid container>
            <Grid xs={7} item>
              <Grid container direction="column">
                <FormControl>
                  <FormLabel id="filter-modal__interest" sx={labelStyle}>
                    운동 종목
                  </FormLabel>
                </FormControl>
              </Grid>
            </Grid>
            <Grid xs={5} item>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel id="filter-modal__gender" sx={labelStyle}>
                  성별
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    row
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Checkbox />}
                      label="남"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Checkbox />}
                      label="여"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel id="filter-modal__age" sx={labelStyle}>
                  연령대
                </FormLabel>
                <FormControl fullWidth>
                  <Select
                    value={age}
                    onChange={handleAgeChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value="">선택 안함</MenuItem>
                    <MenuItem value={10}>10대</MenuItem>
                    <MenuItem value={20}>20대</MenuItem>
                    <MenuItem value={30}>30대</MenuItem>
                    <MenuItem value={40}>40대</MenuItem>
                    <MenuItem value={50}>50대</MenuItem>
                    <MenuItem value={60}>60대 이상</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                className="filter-modal__wrapper"
                container
                direction="column"
              >
                <FormLabel id="filter-modal__location" sx={labelStyle}>
                  지역
                </FormLabel>
                <FormControl fullWidth>
                  <Select
                    value={location}
                    onChange={handleLocationChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value="">선택 안함</MenuItem>
                    <MenuItem value={10}>서울</MenuItem>
                    <MenuItem value={20}>경기</MenuItem>
                    <MenuItem value={30}>강원</MenuItem>
                    <MenuItem value={40}>충북</MenuItem>
                    <MenuItem value={50}>충남</MenuItem>
                    <MenuItem value={60}>부산</MenuItem>
                  </Select>
                  {/* <GrSelect
                    value={location}
                    onChange={handleLocationChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >                    <MenuItem value="">선택 안함</MenuItem>
                  <MenuItem value={10}>서울</MenuItem>
                  <MenuItem value={20}>경기</MenuItem>
                  <MenuItem value={30}>강원</MenuItem>
                  <MenuItem value={40}>충북</MenuItem>
                  <MenuItem value={50}>충남</MenuItem>
                  <MenuItem value={60}>부산</MenuItem></GrSelect> */}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="filter-modal__button-wrapper" item>
            <GrButton
              className="filter-modal__button"
              xs={1}
              variant="contained"
            >
              필터 설정
            </GrButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default FilterModal;
