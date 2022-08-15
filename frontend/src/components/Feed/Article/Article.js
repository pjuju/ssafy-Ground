import userImage from "assets/images/userImage.png";
import ArticleActivity from "components/Feed/Article/ArticleActivity";
import ArticleContent from "components/Feed/Article/ArticleContent";
import ArticleInfo from "components/Feed/Article/ArticleInfo";
import ArticleMore from "components/Feed/Article/ArticleMore";

import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserState } from "api/user";

function Article({ articleData }) {
  const id = articleData.id;
  const user = articleData.user;
  const category = articleData.category;
  const date = articleData.regDttm;
  const content = articleData.content;
  const images = articleData.images;
  const location = articleData.location;
  const likeCnt = articleData.likeCnt;
  const commentCnt = articleData.commentCnt;
  const [saveCnt, setSaveCnt] = useState(articleData.saveCnt);
  const boardLikes = articleData.boardLikes;
  const boardSaves = articleData.boardSaves;

  // 로그인한 사용자의 정보
  const [nickname, setNickname] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getUserState((res) => {
      setNickname(res.data.nickname);

      boardLikes.map((item) => {
        /* boardLikes 목록에 내 아이디가 있다면 이 게시글에 좋아요를 누른 것 */
        if (item.user.id === res.data.id) {
          setIsLiked(true);
        }
      });

      boardSaves.map((item) => {
        /* boardSaves 목록에 내 아이디가 있다면 이 게시글을 저장한 것 */
        if (item.user.id === res.data.id) {
          setIsSaved(true);
        }
      });
    });
  }, []);

  return (
    <Box className="article">
      <Grid className="article__inner" container direction="row">
        <Grid className="article__inner__userimg">
          <img src={userImage} />
        </Grid>
        <Grid className="article__inner__left">
          <ArticleInfo
            nickname={user.nickname}
            category={category}
            date={date}
          />
          <ArticleContent
            id={id}
            content={content}
            location={location}
            images={images}
          />
          <ArticleActivity
            nickname={nickname}
            id={id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            likeCnt={likeCnt}
            commentCnt={commentCnt}
          />
        </Grid>
        <Grid className="article__inner_right">
          <ArticleMore
            id={id}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
            saveCnt={saveCnt}
            setSaveCnt={setSaveCnt}
            content={content}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Article;
