import { Grid } from "@mui/material";
import "styles/Feed/FollowFeed.scss";

function FollowFeed() {
  const ref = React.useRef(null);

  useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, setMessages]);

  return (
    <Grid className="content">
      <Grid className="content__title">
        <h2>팔로우 피드</h2>
      </Grid>
      <Grid className="content__inner">inner 입니다.</Grid>
    </Grid>
  );
}

export default FollowFeed;
