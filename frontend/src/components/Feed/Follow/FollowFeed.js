import { Grid } from "@mui/material";
import { interestList } from "components/common/interestList";
import { useEffect } from "react";
import "styles/Feed/FollowFeed.scss";
import Article from "../Article/Article";

function FollowFeed() {
  useEffect(() => {
    console.log(interestList);
  });

  const articleData = {
    userImg: "assets/images/userImage.png",
    userName: "username",
    category: "헬스",
    date: "2022-08-04T22:15:01",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.",
    location: "대구광역시",
    isLiked: true,
    likeCnt: 15,
    commentCnt: 10,
    isSaved: true,
    saveCnt: 3,
  };

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
