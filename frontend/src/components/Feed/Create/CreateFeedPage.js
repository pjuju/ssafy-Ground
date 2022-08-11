import { Button, Container, Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from "@mui/system";
import { storage } from "api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { feedCreate } from "api/feed";
import GrButton from "components/common/GrButton";
import {
  setFeedCategoryId,
  setFeedContent,
  setFeedData,
  setFeedImages,
  setFeedLocationId,
  setFeedPrivate,
} from "modules/feed";
import ArticleText from "./ArticleText";
import CategoryDropdown from "./CategoryDropdown";
import RegionDropdown from "./RegionDropdown";
import ArticleOpen from "./ArticleOpen";
import ArticleImg from "./ArticleImg";

function CreateFeedPage() {
  const state = useSelector((state) => state);
  const feedData = useSelector((state) => state.feed.feedData);
  const feedContent = useSelector((state) => state.feed.feedContent);
  const feedImages = useSelector((state) => state.feed.feedImages);
  const feedLocationId = useSelector((state) => state.feed.feedLocationId);
  const feedCategoryId = useSelector((state) => state.feed.feedCategoryId);
  const feedPrivate = useSelector((state) => state.feed.feedPrivate);
  const [authOpen, setAuthOpen] = useState(false);
  const [imageList, setImageList] = useState([]);

  const dispatch = useDispatch();

  const onSetFeedData = (feedData) => dispatch(setFeedData(feedData));
  const onSetFeedContent = (feedContent) =>
    dispatch(setFeedContent(feedContent));
  const onSetFeedImages = (feedImages) => dispatch(setFeedImages(feedImages));
  const onSetFeedLocationId = (feedLocationId) =>
    dispatch(setFeedLocationId(feedLocationId));
  const onSetFeedCategoryId = (feedCategoryId) =>
    dispatch(setFeedCategoryId(feedCategoryId));
  const onSetFeedPrivate = (feedPrivate) =>
    dispatch(setFeedPrivate(feedPrivate));

  useEffect(() => {
    console.log(state);
  });
  const onClickAuth = () => {
    const data = {
      content: feedContent,
      images: imageList,
      locationId: feedLocationId,
      categoryId: feedCategoryId,
      privateYN: feedPrivate,
    };
    feedCreate(
      data,
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(data);
      }
    );
    setAuthOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let imgNumList = [];
      const imgUpload = await Promise.all(
        feedImages.map((src) => {
          const randNum = parseInt(
            (new Date().getTime() + Math.random()) * 100
          );
          const fileName = src.name;
          const fileLength = fileName.length;
          const lastDot = fileName.lastIndexOf(".");
          const fileSpec = fileName
            .substring(lastDot + 1, fileLength)
            .toLowerCase();
          const imgType = ["jpg", "png", "gif"];
          console.log(randNum);
          const storageRef = ref(storage, `images/${randNum}`);
          if (imgType.indexOf(fileSpec) !== -1) {
            imgNumList.push({
              imageType: fileSpec,
              imageUrl: randNum.toString(),
            });
          }
          if (fileSpec === "mp4") {
            imgNumList.push({
              imageType: fileSpec,
              imageUrl: randNum.toString(),
            });
          }
          uploadBytes(storageRef, src).then((snapshot) => {
            console.log("Uploaded a blob or file!");
          });
        })
      );
      setImageList(imgNumList);
    } catch (err) {
      console.log("err");
    }
    
    setAuthOpen(true);
  };

  return (
    <Grid container direction="column" className="create-feed__top">
      <Grid
        container
        direction="row"
        className="create-feed__back"
        alignItems="center"
      >
        {/* <ArrowBack fontSize="large" /> */}
        <ArrowBackIosIcon fontSize="large" />
        <div className="create-feed__title"> 글 작성 </div>
      </Grid>
      <Grid
        container
        direction="row"
        className="create-feed__button-wrapper"
        justifyContent="right"
      >
        <GrButton className="create-feed__cancel-button" variant="outlined">
          취소
        </GrButton>
        <GrButton
          className="create-feed__button"
          variant="contained"
          onClick={handleSubmit}
        >
          작성
        </GrButton>
      </Grid>
      <Grid
        container
        direction="column"
        className="create-feed__box"
        alignItems="center"
      >
        <ArticleText
          feedContent={feedContent}
          onSetFeedContent={onSetFeedContent}
        />
        <CategoryDropdown
          feedCategoryId={feedCategoryId}
          onSetFeedCategoryId={onSetFeedCategoryId}
        />
        <RegionDropdown
          feedLocationId={feedLocationId}
          onSetFeedLocationId={onSetFeedLocationId}
        />
        <ArticleOpen
          feedPrivate={feedPrivate}
          onSetFeedPrivate={onSetFeedPrivate}
        />
        <ArticleImg feedImages={feedImages} onSetFeedImages={onSetFeedImages} />
      </Grid>
      <Modal open={authOpen}>
        <Box className="create-feed__modal-box">
          <Grid
            container
            className="create-feed__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              <div> 작성되었습니다. </div>
            </Grid>
            <Grid
              container
              justifyContent="center"
              className="crate-feed__modal"
            >
              <GrButton onClick={onClickAuth}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}

export default CreateFeedPage;
