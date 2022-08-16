import { Grid } from "@mui/material";
import TitleBar from "components/common/TitleBar";

const handleClickTitle = () => {
  document.querySelector(".content").scrollTo(0, 0);
};

function SearchTitle() {
  return (
    <>
      <Grid className="content__title-desktop" onClick={handleClickTitle}>
        <h2>검색</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="검색" isBack={false} />
      </Grid>
    </>
  );
}

export default SearchTitle;
