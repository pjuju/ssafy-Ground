import MediaSlider from "components/Feed/Article/MediaSlider";

import { Grid } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function ArticleContent(props) {
  return (
    <Grid className="article-content">
      <Grid className="article-content__text">
        <span>{props.content}</span>
        <span>더보기</span>
      </Grid>
      <Grid className="article-content__media">
        <MediaSlider images={props.images}/>
      </Grid>
      <Grid className="article-content__location">
        <LocationOnOutlinedIcon />
        <span>{props.location}</span>
      </Grid>
    </Grid>
  );
}

export default ArticleContent;
