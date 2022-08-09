import ArticleText from "./ArticleText";
import CategoryDropdown from "./CategoryDropdown";
import RegionDropdown from "./RegionDropdown";
import ArticleOpen from "./ArticleOpen";
import ArticleImg from "./ArticleImg";
import { Grid } from "@mui/material";

function ArticleBox() {
  return (
    <Grid container direction="column">
      <ArticleText />
      <CategoryDropdown />
      <RegionDropdown />
      <ArticleOpen />
      <ArticleImg />
    </Grid>
  );
}

export default ArticleBox;
