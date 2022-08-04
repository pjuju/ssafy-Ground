import { Grid } from "@mui/material";
import { interestList } from "components/common/interestList";
import { useEffect } from "react";
import "styles/Feed/FollowFeed.scss";
import Article from "../Article/Article";

function FollowFeed() {
  useEffect(() => {
    console.log(interestList);
  })

  const articleData = {
    userImg: "assets/images/userImage.png",
    userName: "username",
    category: "헬스",
    time: "2022-08-03 13:59",
  }

  return (
    <Grid className="content">
      <Grid className="content__title">
        <h2>팔로우 피드</h2>
      </Grid>
      <Grid className="content__inner">
        <Article articleData={articleData} />
      </Grid>
    </Grid>
  );
}

export default FollowFeed;
