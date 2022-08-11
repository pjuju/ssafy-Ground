import { Button, Container, Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { storage } from "api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { feedCreate, feedRead, feedUpdate } from "api/feed";
import GrButton from "components/common/GrButton";
import { setFeedCategoryId, setFeedContent, setFeedData, setFeedImages, setFeedLocationId, setFeedPrivate } from "modules/feed";
import ArticleText from "../Create/ArticleText";
import CategoryDropdown from "../Create/CategoryDropdown";
import RegionDropdown from "../Create/RegionDropdown";
import ArticleOpen from "../Create/ArticleOpen";
import ArticleImg from "../Create/ArticleImg";
import { useParams } from "react-router-dom";
import UpdateImg from "./UpdateImg";

function UpdateFeed () {
  const state = useSelector((state) => state);
  const feedData = useSelector((state) => state.feed.feedData);
  const feedContent = useSelector((state) => state.feed.feedContent);
  const feedImages = useSelector((state) => state.feed.feedImages);
  const feedLocationId = useSelector((state) => state.feed.feedLocationId);
  const feedCategoryId = useSelector((state) => state.feed.feedCategoryId);
  const feedPrivate = useSelector((state) => state.feed.feedPrivate);
  const [authOpen, setAuthOpen] = useState(false);
 

  const dispatch = useDispatch();

  const onSetFeedData = (feedData) => dispatch(setFeedData(feedData));
  const onSetFeedContent = (feedContent) => dispatch(setFeedContent(feedContent));
  const onSetFeedImages = (feedImages) => dispatch(setFeedImages(feedImages));
  const onSetFeedLocationId = (feedLocationId) => dispatch(setFeedLocationId(feedLocationId));
  const onSetFeedCategoryId = (feedCategoryId) => dispatch(setFeedCategoryId(feedCategoryId));
  const onSetFeedPrivate = (feedPrivate) => dispatch(setFeedPrivate(feedPrivate));
  const practiceData = {content: "업로드 테스트 13", images: [{id: 17, imageUrl: '166015994929442', imageType: 'mp4'}, {id: 18, imageUrl: '166015994929457', imageType: 'png'}], locationId: 14, categoryId: 12, privateYN: false}

  const articleId = 50
  
  useEffect(() => {
    handleRender();
   
    // const setState = async () => {
    //   const render = await handleRender();
    //   const fetch = await fetchImage(); 
    // }
    // setState().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(state)
  })
  const onClickAuth = () => {
    setAuthOpen(false);
  }

  // const handleSubmit = () => {
  //   let imgNumList = []
  //   feedImages.map((src) => {
  //     const randNum = parseInt((new Date().getTime() + Math.random())*100);
  //     const fileName = src.name;
  //     const fileLength = fileName.length;
  //     const lastDot = fileName.lastIndexOf('.');
  //     const fileSpec = fileName.substring(lastDot+1, fileLength).toLowerCase();
  //     const imgType = ['jpg', 'png', 'gif']
  //     console.log(randNum)
  //     const storageRef = ref(storage, `images/${randNum}`);
  //     uploadBytes(storageRef, src).then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //       if (imgType.indexOf(fileSpec) !== -1) {
  //         imgNumList.push(["img",randNum]);
  //       }
  //       if (fileSpec === "mp4") {
  //         imgNumList.push(["video",randNum]);
  //       }
  //     })
  //   })

  //   const data = {
  //     content: feedContent,
  //     images: imgNumList,
  //     locationId: feedLocationId,
  //     categoryId: feedCategoryId,
  //     privateYN: feedPrivate,
  //   }
  //   onSetFeedData(data)
  //   console.log(data)
  //   feedCreate(data, (res) => {
  //     console.log(res.data)
  //     setAuthOpen(true)
  //   })   
  // };
  const handleSubmit = () => {
    const data = {
      content: feedContent,
      images: feedImages,
      locationId: feedLocationId,
      categoryId: feedCategoryId,
      privateYN: feedPrivate,
    }
    feedUpdate(articleId, data, (res) => {
      console.log(res.data)
      setAuthOpen(true)
    }) 
  }

  const handleReload = () => {
    onSetFeedData(practiceData);
    console.log(feedData);
    onSetFeedContent(feedData.content)
    onSetFeedLocationId(feedData.locationId)
    onSetFeedCategoryId(feedData.categoryId)
    onSetFeedImages(feedData.images)
    onSetFeedPrivate(feedData.privateYN)
  };

  const handleRender = () => {
    feedRead(articleId, (res) => {
      console.log(res.data)
      onSetFeedContent(res.data.content)
      onSetFeedLocationId(res.data.locationId)
      onSetFeedCategoryId(res.data.categoryId)
      onSetFeedImages(res.data.images)
      onSetFeedPrivate(res.data.privateYN)
    })
  
  }


  // const fetchImage = () => {
  //   console.log(feedImages)
  //   feedImages.map((src,index) => {
  //     const storageRef = ref(storage, `images/${src.imageUrl}`);
  //     let imgUrlList = [...imgList]
  //     const imgType = ['jpg', 'png', 'gif']
  //     getDownloadURL(storageRef).then((url) => {
  //       console.log("download complete")
  //       if (imgType.indexOf(src.imageType) !== -1) {
  //         imgUrlList.push(["img", url])
  //       }
  //       if (src.imageType === "mp4") {
  //         imgUrlList.push(["video", url])
  //       }
  //     })
  //     setImgList(imgUrlList)
  //   })
  // }

  return (
    <Grid container direction="column" className="update-feed__top">
      <Grid
        container
        direction="row"
        className="update-feed__back"
        alignItems="center"
      >
        {/* <ArrowBack fontSize="large" /> */}
        <div className="update-feed__title"> 글 수정 </div>
      </Grid>
      <Grid
        container
        direction="row"
        className="update-feed__button-wrapper"
        justifyContent="right"
      >
        <GrButton className="update-feed__cancel-button" variant="outlined">
          취소
        </GrButton>
        <GrButton className="update-feed__button" variant="contained" onClick={handleSubmit}>
          수정
        </GrButton>
      </Grid>
      <Grid
        container
        direction="column"
        className="update-feed__box"
        alignItems="center"
      >
        <ArticleText feedContent={feedContent} onSetFeedContent={onSetFeedContent}/>
        <CategoryDropdown feedCategoryId={feedCategoryId} onSetFeedCategoryId={onSetFeedCategoryId}/>
        <RegionDropdown feedLocationId={feedLocationId} onSetFeedLocationId={onSetFeedLocationId}/>
        <ArticleOpen feedPrivate={feedPrivate} onSetFeedPrivate={onSetFeedPrivate}/>
        <UpdateImg feedImages={feedImages} onSetFeedImages={onSetFeedImages}/>
      </Grid>
      <Modal open={authOpen}>
        <Box className="update-feed__modal-box">
          <Grid
            container
            className="update-feed__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              <div> 수정되었습니다. </div>
            </Grid>
            <Grid container justifyContent="center" className="update-feed__modal">
              <GrButton onClick={onClickAuth}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}

export default UpdateFeed;