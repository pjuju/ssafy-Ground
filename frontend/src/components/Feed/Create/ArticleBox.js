import ArticleText from "./ArticleText";
import CategoryDropdown from "./CategoryDropdown";
import RegionDropdown from "./RegionDropdown";
import ArticleOpen from "./ArticleOpen";
import ArticleImg from "./ArticleImg";
import { Grid } from "@mui/material";

function ArticleBox({feedData, setFeedData}) {
  return (
    <Grid container direction="column" className="create-feed__box" alignItems="center">
      <ArticleText />
      <CategoryDropdown />
      <RegionDropdown />
      <ArticleOpen />
      <ArticleImg />
    </Grid>
  );
}

export default ArticleBox;
