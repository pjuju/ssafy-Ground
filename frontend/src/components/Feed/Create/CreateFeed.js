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
import CustomModal from "components/common/CustomModal";
import "styles/Feed/CreateFeed.scss";

function CreateFeedPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

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

  const handleSubmit = () => {
    if (boardInfo.categoryId === undefined) {
      setIsCategoryError(true);
    }
    if (boardInfo.locationId === undefined) {
      setIsLocationError(true);
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
        setAuthOpen(true);
      });
    }
  };

  const onClickAuth = () => {
    uploadImages.map((src) => {
      if (src.id === undefined) {
        const storageRef = ref(storage, `images/${src.imageUrl}`);
        uploadBytes(storageRef, src.file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      }
    });
    navigate(-1);
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Grid className="content">
      <Grid container direction="column" className="create-feed__top">
        <Grid className="content__title-desktop create-feed__top__title">
          <IconButton onClick={handleClickBack}>
            <ArrowBackIcon />
          </IconButton>
          <h2 className="back">글 작성</h2>
        </Grid>
        <Grid className="content__title-mobile">
          <TitleBar title="글 작성" isBack={true} />
        </Grid>
        <Grid className="content__inner">
          <Grid
            container
            direction="row"
            className="create-feed__button-wrapper"
            justifyContent="right"
          >
            <GrButton
              className="create-feed__cancel-button"
              variant="outlined"
              onClick={() => setCancelOpen(true)}
            >
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
              <ArticleText boardInfo={boardInfo} setBoardInfo={setBoardInfo} />
              <CategoryDropdown
                boardInfo={boardInfo}
                setBoardInfo={setBoardInfo}
                isCategoryError={isCategoryError}
              />
              <RegionDropdown
                boardInfo={boardInfo}
                setBoardInfo={setBoardInfo}
                isLocationError={isLocationError}
              />
              <ArticleOpen boardInfo={boardInfo} setBoardInfo={setBoardInfo} />
              <ArticleImg
                boardInfo={boardInfo}
                newImages={newImages}
                uploadImages={uploadImages}
                setBoardInfo={setBoardInfo}
                setNewImages={setNewImages}
                setUploadImages={setUploadImages}
              />
            </Grid>
          )}
        </Grid>
        <CustomModal
          open={cancelOpen}
          setOpen={setCancelOpen}
          title="글 작성을 취소하시겠습니까?"
          type="0"
          handleClickOKButton={handleClickBack}
        />
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          title="작성되었습니다."
          type="1"
          handleClickOKButton={onClickAuth}
        />
      </Grid>
    </Grid>
  );
}

export default CreateFeedPage;
