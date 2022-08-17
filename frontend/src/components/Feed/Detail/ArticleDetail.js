import "styles/Feed/ArticleDetail.scss";

import { Container, Grid, IconButton, Stack } from "@mui/material";
import { getBoardDetail } from "api/board";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleDetailContent from "./ArticleDetailContent";
import ArticleDetailComment from "./ArticleDetailComment";
import ArticleDetailLike from "./ArticleDetailLike";
import { deleteComment } from "api/comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TitleBar from "components/common/TitleBar";

function ArticleDetail({ title }) {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState({});

  // 게시글 상세 정보 불러오기
  useEffect(() => {
    console.log(boardId);
    getBoardDetail(boardId, (res) => {
      console.log(res.data);
      setBoardInfo(res.data);
    });
  }, [boardId]);

  // boardInfo가 업데이트 되면 게시글 내용 보여줌
  useEffect(() => {
    if (boardInfo.id) {
      setIsLoading(false);
    }
  }, [boardInfo]);

  const handleClickBack = () => {
    window.history.back();
  };

  return (
    <Grid className="content article-detail">
      <Grid className="content__title-desktop">
        <IconButton onClick={handleClickBack}>
          <ArrowBackIcon />
        </IconButton>
        <h2 className="back">&nbsp;</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar isBack={true} />
      </Grid>
      <Container className="article-detail__wrapper">
        <Grid className="article-detail__inner" container direction="column">
          {!isLoading && (
            <>
              <ArticleDetailContent articleData={boardInfo} />
              <Stack spacing={1} className="article-detail__activity">
                <ArticleDetailLike
                  nickname={boardInfo.user.nickname}
                  isLiked={boardInfo.isLiked}
                  likeCnt={boardInfo.likeCnt}
                />
                <ArticleDetailComment commentList={boardInfo.comments} />
              </Stack>
            </>
          )}
        </Grid>
      </Container>
    </Grid>
  );
}

export default ArticleDetail;
