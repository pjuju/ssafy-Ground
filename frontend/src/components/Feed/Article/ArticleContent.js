import MediaSlider from "components/Feed/Article/MediaSlider";

import { Grid } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ArticleContent(props) {
  const navigate = useNavigate();
  const handleClickMore = () => {
    navigate(`/feed/detail/${props.id}`);
  };

  return (
    <Grid className="article-content">
      <Grid className="article-content__text">
        <span onClick={handleClickMore}>{props.content}</span>
      </Grid>
      <Grid className="article-content__media">
        <MediaSlider images={props.images} />
      </Grid>
      <Grid className="article-content__location">
        <LocationOnOutlinedIcon />
        <span>{props.location}</span>
      </Grid>
    </Grid>
  );
}

export default ArticleContent;
