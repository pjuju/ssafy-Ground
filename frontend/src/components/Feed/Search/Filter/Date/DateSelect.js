import { Grid } from "@mui/material";

import moment from "moment";
import { useEffect, useState } from "react";
import { useFilterDispatch, useFilterState } from "../FilterContext";

import FilterTitle from "../FilterTitle";
import DateRadio from "./DateRadio";
import EndDatePicker from "./EndDatePicker";
import StartDatePicker from "./StartDatePicker";

function DateSelect() {
  const { date } = useFilterState();
  const dispatch = useFilterDispatch();

  // 현재 선택된 라디오
  const [radio, setRadio] = useState("all");
  // 현재 시작 날짜, 종료 날짜
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 타이틀 뒤로가기 눌렀을 때
  const handleClickBack = () => {
    dispatch({ type: "select", select: false });
    dispatch({
      type: "date",
      date: {
        radio: radio,
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  // 라디오 바꼈을 때 핸들러
  const handleRadioChange = (radio) => {
    setRadio(radio);

    let newDate = moment();

    if (radio === "weeks" || radio === "months" || radio === "years") {
      newDate = moment().subtract(1, radio);
    }

    setStartDate(newDate);
  };

  useEffect(() => {
    setRadio(date.radio);
    setStartDate(date.startDate);
    setEndDate(date.endDate);
  }, []);

  return (
    <>
      <FilterTitle title="기간" handleClickBack={handleClickBack} />
      <Grid className="date-select" container justifyContent="center">
        <DateRadio
          radio={radio}
          setRadio={setRadio}
          handleRadioChange={handleRadioChange}
        />
        {radio !== "all" && (
          <Grid
            className="date-select__date-picker"
            container
            justifyContent="center"
          >
            <Grid xs={5} item>
              <StartDatePicker
                radio={radio}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </Grid>
            <span className="date-select--range"> ~ </span>
            <Grid xs={5} item>
              <EndDatePicker
                radio={radio}
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default DateSelect;
