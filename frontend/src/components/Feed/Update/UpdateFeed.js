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
import { set } from "date-fns";

function UpdateFeed () {
  const { boardId } = useParams();
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

 
  useEffect(() => {
    console.log(boardId);
    feedRead(boardId, (res) => {
      console.log(res.data);
      setBoardInfo(res.data);
    }); 
  }, [boardId]);

  useEffect(() => {
    if (boardInfo.id) {
      setIsLoading(false);
      setNewImages(boardInfo.images)
    }
  }, [boardInfo]);

  useEffect(() => {
    console.log(boardInfo)
    console.log(newImages)
    console.log(uploadImages)
  })

  const onClickAuth = () => {
    uploadImages.map((src) => {
      if(src.id === undefined){
        const storageRef = ref(storage, `images/${src.imageUrl}`);
        uploadBytes(storageRef, src.file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      }
      
    })
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
    const newBoardInfo = {
      ...boardInfo, images: newImages
    }
    feedUpdate(boardId, newBoardInfo, (res)=> {
      console.log(res.data)
    })
    setAuthOpen(true)
  }

  // const handleReload = () => {
  //   onSetFeedData(practiceData);
  //   console.log(feedData);
  //   onSetFeedContent(feedData.content)
  //   onSetFeedLocationId(feedData.locationId)
  //   onSetFeedCategoryId(feedData.categoryId)
  //   onSetFeedImages(feedData.images)
  //   onSetFeedPrivate(feedData.privateYN)
  // };

  // const handleRender = () => {
  //   feedRead(articleId, (res) => {
  //     console.log(res.data)
  //     onSetFeedContent(res.data.content)
  //     onSetFeedLocationId(res.data.locationId)
  //     onSetFeedCategoryId(res.data.categoryId)
  //     onSetFeedImages(res.data.images)
  //     onSetFeedPrivate(res.data.privateYN)
  //   })
  
  // }


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
      {!isLoading && (
        <Grid
        container
        direction="column"
        className="update-feed__box"
        alignItems="center"
      >
        <ArticleText boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <CategoryDropdown boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <RegionDropdown boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <ArticleOpen boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <UpdateImg boardInfo={boardInfo} newImages={newImages} uploadImages={uploadImages} setBoardInfo={setBoardInfo} setNewImages={setNewImages} setUploadImages={setUploadImages}/>
      </Grid>
      )}
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