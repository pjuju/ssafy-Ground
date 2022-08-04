import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useEffect } from "react";

function ArticleInfo(props) {
  useEffect(() => {
    console.log(props);
  });

  return (
    <Grid className="info" container direction="row">
      <Grid className="info__others">
        <Grid className="info__others__username bold">{props.userName}</Grid>
        <Grid className="info__others__category">{props.category}</Grid>
      </Grid>
      <Grid className="info__regtime">{props.time}</Grid>
    </Grid>
  );
}

export default ArticleInfo;
