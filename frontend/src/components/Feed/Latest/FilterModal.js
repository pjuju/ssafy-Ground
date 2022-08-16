import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme";
import { useSelector } from "react-redux";
import GrButton from "components/common/GrButton";

export default function FilterModal({
  open,
  setOpen,
  onToggleInterestList,
  changeInterestList,
}) {
  const interestList = useSelector((state) => state.interest.interestList);

  const handleChangeCheckBox = (id) => {
    onToggleInterestList(id);
  };

  const handleClickSave = () => {
    changeInterestList();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="latest-modal">
          <div className="latest-modal__inner">
            <h3>관심 운동 종목 설정</h3>
            <p className="interest-filter__desc latest-modal__desc">
              설정한 관심 운동 종목을 바탕으로 최신 글이 보입니다.
            </p>
            <Grid>
              <ThemeProvider theme={theme}>
                {interestList.map((item) => {
                  return (
                    <FormControlLabel
                      className="interest-filter__checkbox"
                      key={item.id}
                      label={item.value}
                      value={item.isInterested}
                      control={
                        <Checkbox
                          checked={item.isInterested}
                          onChange={() => handleChangeCheckBox(item.id)}
                        />
                      }
                    />
                  );
                })}
              </ThemeProvider>
            </Grid>
            <Grid className="interest-filter__button latest-modal__button">
              <GrButton
                variant="contained"
                children="설정 저장하기"
                onClick={handleClickSave}
              />
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
