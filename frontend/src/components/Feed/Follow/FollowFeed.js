import { Grid } from "@mui/material";
import { getFollowBoard } from "api/board";
import { interestList } from "components/common/interestList";
import { useEffect, useState } from "react";
import "styles/Feed/FollowFeed.scss";
import Article from "../Article/Article";
import TitleBar from "../TitleBar";

function FollowFeed() {
  const [pageNumber, setPageNumber] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getFollowBoard(pageNumber, (res) => {
      setArticles(res.data.reverse());
    });
  }, [pageNumber]);

  return (
    <Grid className="content">
      <Grid className="content__title-desktop">
        <h2>팔로우 피드</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="팔로우 피드" />
      </Grid>
      <Grid className="content__inner">
        {articles.map((article) => (
          <Article key={article.id} articleData={article} />
        ))}
      </Grid>
    </Grid>
  );
}

export default FollowFeed;
