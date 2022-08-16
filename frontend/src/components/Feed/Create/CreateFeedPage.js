import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TitleBar from "components/common/TitleBar";

function CreateFeedPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isLocationError, setIsLocationError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      content: "",
      images: [],
      locationId: undefined,
      categoryId: undefined,
      privateYN: false,
    };
    setBoardInfo(data);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [boardInfo]);

  useEffect(() => {
    console.log(boardInfo);
    console.log(uploadImages);
    console.log(newImages);
  });
  // const onClickAuth = () => {
  //   const data = {
  //     content: feedContent,
  //     images: imageList,
  //     locationId: feedLocationId,
  //     categoryId: feedCategoryId,
  //     privateYN: feedPrivate,
  //   };
  //   feedCreate(
  //     data,
  //     (res) => {
  //       console.log(res.data);
  //     },
  //     (error) => {
  //       console.log(data);
  //     }
  //   );
  //   setAuthOpen(false);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let imgNumList = [];
  //     const imgUpload = await Promise.all(
  //       feedImages.map((src) => {
  //         const randNum = parseInt(
  //           (new Date().getTime() + Math.random()) * 100
  //         );
  //         const fileName = src.name;
  //         const fileLength = fileName.length;
  //         const lastDot = fileName.lastIndexOf(".");
  //         const fileSpec = fileName
  //           .substring(lastDot + 1, fileLength)
  //           .toLowerCase();
  //         const imgType = ["jpg", "png", "gif"];
  //         console.log(randNum);
  //         const storageRef = ref(storage, `images/${randNum}`);
  //         if (imgType.indexOf(fileSpec) !== -1) {
  //           imgNumList.push({
  //             imageType: fileSpec,
  //             imageUrl: randNum.toString(),
  //           });
  //         }
  //         if (fileSpec === "mp4") {
  //           imgNumList.push({
  //             imageType: fileSpec,
  //             imageUrl: randNum.toString(),
  //           });
  //         }
  //         uploadBytes(storageRef, src).then((snapshot) => {
  //           console.log("Uploaded a blob or file!");
  //         });
  //       })
  //     );
  //     setImageList(imgNumList);
  //   } catch (err) {
  //     console.log("err");
  //   }

  //   setAuthOpen(true);
  // };
  const handleSubmit = () => {
    if (boardInfo.categoryId === undefined) {
      setIsCategoryError(true)
    }
    if (boardInfo.locationId === undefined) {
      setIsLocationError(true)
    }
    const newBoardInfo = {
      ...boardInfo,
      images: newImages,
    };

    if (
      boardInfo.categoryId !== undefined &&
      boardInfo.locationId !== undefined
    ) {
      feedCreate(newBoardInfo, (res) => {
        console.log(res.data);
      });
      setAuthOpen(true);
    }

    if ((boardInfo.categoryId !== undefined) && (boardInfo.locationId !== undefined)) {
      feedCreate(newBoardInfo, (res)=> {
        console.log(res.data)
      })
      setAuthOpen(true)
    }
  }

  const onClickAuth = () => {
    uploadImages.map((src) => {
      if (src.id === undefined) {
        const storageRef = ref(storage, `images/${src.imageUrl}`);
        uploadBytes(storageRef, src.file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      }
    });
    setAuthOpen(false);
    navigate(-1);
  };

  return (
    <Grid container direction="column" className="create-feed__top">
      {/* <Grid
        container
        direction="row"
        className="create-feed__back"
        alignItems="center"
      >
        <ArrowBackIosIcon fontSize="large" />
        <div className="create-feed__title"> 글 작성 </div>
      </Grid> */}
      <Grid className="content__title-desktop create-feed__top__title">
        <IconButton
         >
          <ArrowBackIcon />
        </IconButton>
        <h2 className="back">글 작성</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="글 작성" isBack={true} />
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
      {!isLoading && (
        <Grid
        container
        direction="column"
        className="create-feed__box"
        alignItems="center"
      >
        <ArticleText boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <CategoryDropdown boardInfo={boardInfo} setBoardInfo={setBoardInfo} isCategoryError={isCategoryError}/>
        <RegionDropdown boardInfo={boardInfo} setBoardInfo={setBoardInfo} isLocationError={isLocationError}/>
        <ArticleOpen boardInfo={boardInfo} setBoardInfo={setBoardInfo}/>
        <ArticleImg boardInfo={boardInfo} newImages={newImages} uploadImages={uploadImages} setBoardInfo={setBoardInfo} setNewImages={setNewImages} setUploadImages={setUploadImages}/>
      </Grid>
      )}
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
