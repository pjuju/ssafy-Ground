import { Grid } from "@mui/material";

import { useEffect } from "react";
import { useSearchState } from "../SearchContext";
import { useFilterDispatch, useFilterState } from "./FilterContext";

import DateFilterItem from "./Date/DateFilterItem";
import FilterItem from "./Others/FilterItem";
import FilterSelect from "./Others/FilterSelect";
import DateSelect from "./Date/DateSelect";

const titles = [
  { id: 0, title: "기간" },
  { id: 1, title: "운동종목" },
  { id: 2, title: "성별" },
  { id: 3, title: "연령대" },
  { id: 4, title: "지역" },
];

const types = ["date", "category", "gender", "age", "location"];
const items = titles.filter((title) => title.id > 0);

function FilterContent() {
  const { date, category, gender, age, location } = useSearchState();
  const { id, select } = useFilterState();
  const dispatch = useFilterDispatch();

  const filterItems = items.map((item) => (
    <FilterItem key={item.id} item={item} />
  ));

  // 현재 SearchContext에 설정되어 있는 필터값 불러와서 초기화
  useEffect(() => {
    dispatch({ type: "date", date });
    dispatch({ type: "category", category });
    dispatch({ type: "gender", gender });
    dispatch({ type: "age", age });
    dispatch({ type: "location", location });
  }, []);

  return (
    <div className="filter-modal__inner">
      {
        /* 필터 메인 */
        !select && (
          <>
            <Grid
              className="filter-modal__title content__title-desktop"
              container
              justifyContent="center"
            >
              필터
            </Grid>
            <DateFilterItem />
            {filterItems}
          </>
        )
      }
      {
        /* 필터 항목 선택했을 때 */
        select && (
          <>
            {id === 0 && <DateSelect />}
            {id !== 0 && <FilterSelect titles={titles} type={types[id]} />}
          </>
        )
      }
    </div>
  );
}

export default FilterContent;
