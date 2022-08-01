import ArticleText from "./ArticleText";
import CategoryDropdown from "./CategoryDropdown";
import RegionDropdown from "./RegionDropdown";
import ArticleOpen from "./ArticleOpen";
import ArticlePhoto from "./ArticlePhoto";
import { Grid } from "@mui/material";

function ArticleBox () {
  return (
    <Grid
      container
      direction="column"
    >
      <ArticleText/>
      <CategoryDropdown/>
      <RegionDropdown/>
      <ArticleOpen/>
      <ArticlePhoto/>
    </Grid>
  )
}

export default ArticleBox;