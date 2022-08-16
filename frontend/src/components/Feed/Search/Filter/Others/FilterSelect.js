import { Divider, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { useFilterState, useFilterDispatch } from "../FilterContext";

import FilterTitle from "../FilterTitle";
import FilterRadio from "./FilterRadio";
import Checkboxes from "./Checkboxes";

function FilterSelect({ titles, type }) {
  const { id, category, gender, age, location } = useFilterState();
  const dispatch = useFilterDispatch();

  // 현재 필터에서 선택된 라디오
  const [radio, setRadio] = useState("");
  // 현재 필터에서 선택된 항목
  const [values, setValues] = useState([]);

  // 타이틀 뒤로가기 눌렀을 때
  const handleClickBack = () => {
    dispatch({ type: "select", select: false });
    dispatch({ type: type, [type]: { radio: radio, values: values } });
  };

  useEffect(() => {
    let state = {};
    switch (id) {
      case 1:
        state = category;
        break;
      case 2:
        state = gender;
        break;
      case 3:
        state = age;
        break;
      case 4:
        state = location;
        break;
      default:
        throw new Error();
    }
    setRadio(state.radio);
    setValues(state.values);
  }, []);

  return (
    <>
      <FilterTitle title={titles[id].title} handleClickBack={handleClickBack} />
      <Grid
        className="filter-select"
        container
        direction="column"
        justifyContent="center"
      >
        <Grid item xs={12} className="filter-select__radio">
          <FilterRadio radio={radio} setRadio={setRadio} />
        </Grid>
        <Divider />
        {radio !== "all" && (
          <Checkboxes
            xs={4}
            radio={radio}
            values={values}
            setValues={setValues}
          />
        )}
      </Grid>
    </>
  );
}

export default FilterSelect;
