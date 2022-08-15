import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFilterDispatch } from "../FilterContext";

function FilterItem({ item }) {
  const dispatch = useFilterDispatch();

  const handleClickIFilterItem = (e) => {
    e.preventDefault();
    dispatch({ type: "title", id: item.id });
    dispatch({ type: "select", select: true });
  };

  return (
    <Grid
      className="filter-modal__item"
      onClick={handleClickIFilterItem}
      container
      justifyContent="center"
    >
      <Grid item xs={11}>
        {item.title}
      </Grid>
      <ArrowForwardIosIcon className="filter-modal__item--arrow" />
    </Grid>
  );
}

export default FilterItem;
