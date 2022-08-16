import userImg from "assets/images/userImage.png";
import ArticleActivity from "components/Feed/Article/ArticleActivity";
import ArticleContent from "components/Feed/Article/ArticleContent";
import ArticleInfo from "components/Feed/Article/ArticleInfo";
import ArticleMore from "components/Feed/Article/ArticleMore";

import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserState } from "api/user";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";

function Article({ articleData }) {
  const navigate = useNavigate();
  const id = articleData.id;
  const user = articleData.user;
  const category = articleData.category;
  const date = articleData.regDttm;
  const content = articleData.content;
  const images = articleData.images;
  const location = articleData.location;
  const [likeCnt, setLikeCnt] = useState(articleData.saveCnt);
  const commentCnt = articleData.commentCnt;
  const [saveCnt, setSaveCnt] = useState(articleData.saveCnt);
  const boardLikes = articleData.boardLikes;
  const boardSaves = articleData.boardSaves;
  const userImage = user.userImage
  const [profileImg, setProfileImg] = useState("");

  // 로그인한 사용자의 정보
  const [nickname, setNickname] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    console.log(articleData);
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

  useEffect(() => {
    preview();
  });

  useEffect(() => {
    fetchImage();
  }, [userImage]);

  const preview = () => {
    if (profileImg === "") return false;
    const imgElement = document.querySelector(".article__inner__userimg > img");
    if (imgElement !== null) {
      imgElement.src = profileImg;
    }
    if (imgElement === undefined) {
      imgElement.src = userImg;
    }
  };

  const fetchImage = () => {
    const storageRef = ref(storage, `images/${userImage}`);

    if (userImage !== undefined && userImage !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download user");
        setProfileImg(url);
      });
    }
  };

  const handleClickImg = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <Box className="article">
      <Grid className="article__inner" container direction="row">
        <Grid className="article__inner__userimg" onClick={handleClickImg}>
          <img src={profileImg||userImg} />
        </Grid>
        <Grid className="article__inner__left">
          <ArticleInfo
            userId={user.id}
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
