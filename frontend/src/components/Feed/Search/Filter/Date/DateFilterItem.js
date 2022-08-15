import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFilterDispatch, useFilterState } from "../FilterContext";

function DateFilterItem() {
  const { date } = useFilterState();
  const dispatch = useFilterDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "select", select: "false" });
    dispatch({ type: "title", id: 0 });
  };

  return (
    <Grid
      className="filter-modal__item filter-modal__item--date"
      container
      justifyContent="center"
      onClick={handleClick}
    >
      <Grid item xs={11}>
        기간
        <span className="date-item__range">
          {date?.radio === "all" && "전체"}
          {date?.radio !== "all" && (
            <>
              {date?.startDate.format("YYYY-MM-DD")} ~ {date?.endDate.format("YYYY-MM-DD")}
            </>
          )}
        </span>
      </Grid>
      <ArrowForwardIosIcon className="filter-modal__item--arrow" />
    </Grid>
  );
}

export default DateFilterItem;
