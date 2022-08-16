import userImg from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";

import ArticleContent from "components/Feed/Article/ArticleContent";
import ArticleInfo from "components/Feed/Article/ArticleInfo";
import ArticleMore from "components/Feed/Article/ArticleMore";

function ArticleDetailContent({ articleData }) {
  const id = articleData.id;
  const user = articleData.user;
  const userImage = user.userImage;
  const category = articleData.category;
  const date = articleData.regDttm;
  const content = articleData.content;
  const location = articleData.location;
  const saveCnt = articleData.saveCnt;
  const images = articleData.images;
  const isSaved = false;
  const [profileImg, setProfileImg] = useState("");


  useEffect(() => {
    console.log(user)
    fetchImage();
  }, [userImage]);


  const fetchImage = () => {
    const storageRef = ref(storage, `images/${userImage}`);

    if (userImage !== undefined && userImage !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download user");
        setProfileImg(url);
      });
    }
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid className="article__inner__userimg">
        <img src={profileImg||userImg} alt="user_img" />
      </Grid>
      <Grid className="article__inner__left">
        <ArticleInfo nickname={user.nickname} category={category} date={date} />
        <ArticleContent id={id} content={content} location={location} images={images} />
      </Grid>
      <Grid className="article__inner_right">
        <ArticleMore id={id} isSaved={isSaved} saveCnt={saveCnt} />
      </Grid>
    </Grid>
  );
}

export default ArticleDetailContent;
