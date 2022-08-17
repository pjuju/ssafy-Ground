import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import add from "assets/images/add.png"


function ArticleImg({ boardInfo, newImages, setNewImages, uploadImages, setUploadImages }) {
  const selectUserImg = useRef("");
  const [imgList, setImgList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);


  useEffect(() => {
    console.log("download complete")
    console.log(imgList)
    if (isDisplay === true) {
      selectUserImg.current.value = "";
    }
  }, [imgList]);





  const handleClickInput = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const fileName = file.name;
    const fileLength = fileName.length;
    const lastDot = fileName.lastIndexOf('.');
    const fileSpec = fileName.substring(lastDot + 1, fileLength).toLowerCase();
    const randNum = parseInt((new Date().getTime() + Math.random()) * 100);
    let imgUrlList = [...imgList];
    let fileUrlList = [...fileList];
    let imgNumList = [...newImages];
    let uploadList = [...uploadImages];
    const imgType = ['jpg', 'png', 'gif', 'jpeg']
    console.log(fileSpec)
    if (imgUrlList.length >= 4) {
      setIsDisplay(false);
    }

    if (event.target.files.length !== 0) {
      if (imgType.indexOf(fileSpec) !== -1) {
        imgUrlList.push(["img", URL.createObjectURL(file)]);
      }
      if (fileSpec === "mp4") {
        imgUrlList.push(["video", URL.createObjectURL(file)]);
      }
      imgNumList.push({
        imageType: fileSpec,
        imageUrl: randNum.toString(),
      });
      uploadList.push({
        imageType: fileSpec,
        imageUrl: randNum.toString(),
        file: file
      });
      fileUrlList.push(file);
    }
    setImgList(imgUrlList);
    setFileList(fileUrlList);
    setNewImages(imgNumList);
    setUploadImages(uploadList);
    console.log(imgList);
  };

  const handleDeleteImage = (id) => {
    setImgList(imgList.filter((_, index) => index !== id));
    setFileList(fileList.filter((_, index) => index !== id));
    setNewImages(newImages.filter((_, index) => index !== id));
    setUploadImages(uploadImages.filter((_, index) => index !== id))
    setIsDisplay(true);

  };

  return (
    <Grid container direction="row">
      <Grid container>
        <div className="create-feed__imglabel">사진/영상</div>
        <Grid container direction="row">
          {isDisplay === true && (
            <Grid item>
              <input
                type="file"
                accept=".jpg, .png, .gif, .jpeg, .mp4"
                ref={selectUserImg}
                style={{ display: "none" }}
                onChange={handleClickInput}
              />
              <button
                onClick={() => selectUserImg.current.click()}
                className="create-feed__img-button"
              >
                <img
                  src={add}
                  style={{ width: "100%", border: "1px solid #d3d3d3", borderRadius: "10px" }}
                  alt=""
                />
              </button>
            </Grid>
          )}
          {imgList.map((src, index) => (
            <Grid item key={index} className="create-feed__media-wrapper">
              {src[0] === "img" && (
                <img
                  src={src[1]}
                  className="create-feed__media"
                  alt=""
                />
              )}

              {src[0] === "video" && (
                <video
                  src={src[1]}
                  className="create-feed__media"
                  alt=""
                  autoPlay
                  controls
                />
              )}
              <button className="create-feed__delete-button" onClick={() => handleDeleteImage(index)}>x</button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArticleImg;
