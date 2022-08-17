import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { storage } from "api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { feedCreate, feedRead, feedUpdate } from "api/feed";
import GrButton from "components/common/GrButton";
import {
  setFeedCategoryId,
  setFeedContent,
  setFeedData,
  setFeedImages,
  setFeedLocationId,
  setFeedPrivate,
} from "modules/feed";
import ArticleText from "../Create/ArticleText";
import CategoryDropdown from "../Create/CategoryDropdown";
import RegionDropdown from "../Create/RegionDropdown";
import ArticleOpen from "../Create/ArticleOpen";
import ArticleImg from "../Create/ArticleImg";
import { useParams } from "react-router-dom";
import UpdateImg from "./UpdateImg";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TitleBar from "components/common/TitleBar";
import CustomModal from "components/common/CustomModal";
import "styles/Feed/UpdateFeed.scss";

function UpdateFeed() {
  const { boardId } = useParams();
  const [authOpen, setAuthOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    feedRead(boardId, (res) => {
      setBoardInfo(res.data);
    });
  }, [boardId]);

  useEffect(() => {
    if (boardInfo.id) {
      setIsLoading(false);
      setNewImages(boardInfo.images);
    }
  }, [boardInfo]);

  useEffect(() => {
    // console.log(boardInfo);
    // console.log(newImages);
    // console.log(uploadImages);
  });

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

  const handleSubmit = () => {
    const newBoardInfo = {
      ...boardInfo,
      images: newImages,
    };
    feedUpdate(boardId, newBoardInfo, (res) => {
      console.log(res.data);
    });
    setAuthOpen(true);
  };

  const handleClickBack = () => {
    window.history.back();
  };

  return (
    <Grid className="content">
      <Grid container direction="row" className="update-feed__top">
        <Grid className="content__title-desktop update-feed__top__title">
          <IconButton onClick={handleClickBack}>
            <ArrowBackIcon />
          </IconButton>
          <h2 className="back">글 수정</h2>
        </Grid>
        <Grid className="content__title-mobile">
          <TitleBar title="글 수정" isBack={true} />
        </Grid>
        <Grid className="content__inner">
          <Grid
            container
            direction="row"
            className="update-feed__button-wrapper"
            justifyContent="right"
          >
            <GrButton
              className="update-feed__cancel-button"
              variant="outlined"
              onClick={() => setCancelOpen(true)}
            >
              취소
            </GrButton>
            <GrButton
              className="update-feed__button"
              variant="contained"
              onClick={handleSubmit}
            >
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
              <ArticleText boardInfo={boardInfo} setBoardInfo={setBoardInfo} />
              <CategoryDropdown
                boardInfo={boardInfo}
                setBoardInfo={setBoardInfo}
              />
              <RegionDropdown
                boardInfo={boardInfo}
                setBoardInfo={setBoardInfo}
              />
              <ArticleOpen boardInfo={boardInfo} setBoardInfo={setBoardInfo} />
              <UpdateImg
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
          title="글 수정을 취소하시겠습니까?"
          type="0"
          handleClickOKButton={handleClickBack}
        />
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          title="수정되었습니다."
          type="1"
          handleClickOKButton={onClickAuth}
        />
      </Grid>
    </Grid>
  );
}

export default UpdateFeed;
