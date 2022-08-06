import { Box, FormLabel, Grid, Modal } from "@mui/material";
import GrButton from "components/common/GrButton";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Checkboxes from "./Checkboxes";
import FilterRadio from "./FilterRadio";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "0.5px solid #888",
  p: 4,
};

const labelStyle = {
  color: "black",
  fontWeight: "600",
};

function FilterModal({ open, handleClose, data, setData, radio, setRadio }) {
  const [interestRadio, setInterestRadio] = useState("all");
  const [genderRadio, setGenderRadio] = useState("all");
  const [ageRadio, setAgeRadio] = useState("all");
  const [locationRadio, setLocationRadio] = useState("all");

  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      interest: data.interest,
      gender: data.gender,
      age: data.age,
      location: data.location,
    },
  });

  const onModalClose = () => {
    setInterestRadio(radio[0]);
    setGenderRadio(radio[1]);
    setAgeRadio(radio[2]);
    setLocationRadio(radio[3]);
    setValue("interest", data.interest);
    setValue("gender", data.gender);
    setValue("age", data.age);
    setValue("location", data.location);
    handleClose();
  };

  const onSubmit = (data) => {
    setData(data);
    setRadio([interestRadio, genderRadio, ageRadio, locationRadio]);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <form>
          <Grid className="filter-modal" container direction="column">
            <Grid container>
              <Grid item xs={6.5}>
                <Grid
                  className="filter-modal__wrapper"
                  container
                  direction="column"
                >
                  <FormLabel
                    className="filter-modal__label"
                    id="filter-modal__interest"
                    sx={labelStyle}
                  >
                    운동 종목
                  </FormLabel>
                  <FilterRadio
                    radio={interestRadio}
                    setRadio={setInterestRadio}
                  />
                  {interestRadio === "custom" && (
                    <Checkboxes
                      options={getValues("interest")}
                      control={control}
                      name="interest"
                      radio={interestRadio}
                      xs={6}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item xs={5.5}>
                <Grid
                  className="filter-modal__wrapper filter-modal__wrapper--right"
                  container
                  direction="column"
                >
                  <FormLabel
                    className="filter-modal__label"
                    id="filter-modal__gender"
                    sx={labelStyle}
                  >
                    성별
                  </FormLabel>
                  <FilterRadio radio={genderRadio} setRadio={setGenderRadio} />
                  {genderRadio === "custom" && (
                    <Checkboxes
                      options={getValues("gender")}
                      control={control}
                      name="gender"
                      radio={genderRadio}
                      xs={3}
                    />
                  )}
                </Grid>
                <Grid
                  className="filter-modal__wrapper filter-modal__wrapper--right"
                  container
                  direction="column"
                >
                  <FormLabel
                    className="filter-modal__label"
                    id="filter-modal__age"
                    sx={labelStyle}
                  >
                    연령대
                  </FormLabel>
                  <FilterRadio radio={ageRadio} setRadio={setAgeRadio} />
                  {ageRadio === "custom" && (
                    <Checkboxes
                      options={getValues("age")}
                      control={control}
                      name="age"
                      radio={ageRadio}
                    />
                  )}
                </Grid>
                <Grid
                  className="filter-modal__wrapper"
                  container
                  direction="column"
                >
                  <FormLabel
                    className="filter-modal__label"
                    id="filter-modal__location"
                    sx={labelStyle}
                  >
                    지역
                  </FormLabel>
                  <FilterRadio
                    radio={locationRadio}
                    setRadio={setLocationRadio}
                  />
                  {locationRadio === "custom" && (
                    <Checkboxes
                      options={getValues("location")}
                      control={control}
                      name="age"
                      radio={locationRadio}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid className="filter-modal__button-wrapper" item>
              <GrButton
                className="filter-modal__button"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                필터 설정
              </GrButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default FilterModal;
