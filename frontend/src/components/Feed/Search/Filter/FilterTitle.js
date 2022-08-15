import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function FilterTitle({ title, handleClickBack }) {
  return (
    <Grid
      className="filter-modal__title content__title-desktop"
      container
      justifyContent="center"
    >
      <button className="filter-modal__title--button" onClick={handleClickBack}>
        <ArrowBackIcon />
      </button>
      <Grid item xs={11} textAlign="center">
        {title}
      </Grid>
    </Grid>
  );
}

export default FilterTitle;
