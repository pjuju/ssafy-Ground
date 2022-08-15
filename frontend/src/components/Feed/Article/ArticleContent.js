import MediaSlider from "components/Feed/Article/MediaSlider";

import { Grid } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

function ArticleContent(props) {
  const navigate = useNavigate();
  const handleClickMore = () => {
    navigate(`/feed/detail/${props.id}`);
  };

  return (
    <Grid className="article-content">
      <Grid className="article-content__text">
        <span>{props.content}</span>
        <span
          className="article-content more"
          onClick={handleClickMore}
        >
          더보기
        </span>
      </Grid>
      <Grid className="article-content__media">
<<<<<<< HEAD
        <MediaSlider images={props.images}/>
=======
        <MediaSlider images={props.images} />
>>>>>>> a6cccfc57a374dae27d126cf206ee0c55b1dc0a1
      </Grid>
      <Grid className="article-content__location">
        <LocationOnOutlinedIcon />
        <span>{props.location}</span>
      </Grid>
    </Grid>
  );
}

export default ArticleContent;
