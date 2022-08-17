import userImage from "assets/images/userImage.png";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";

function ProfileButton({ id, nickname, image, email, username }) {
  const [profileImg, setProfileImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    preview();
  });

  useEffect(() => {
    fetchImage();
  }, [image]);
  const preview = () => {
    if (profileImg === "") return false;
    const imgElement = document.querySelector(".profile-button__img > img");
    if (imgElement !== null) {
      imgElement.src = profileImg;
    }
  };

  const fetchImage = () => {
    const storageRef = ref(storage, `images/${image}`);

    if (image !== undefined && image !== "") {
      getDownloadURL(storageRef).then((url) => {
        console.log("download");
        setProfileImg(url);
      });
    }
  };

  const handleClickProfileButton = () => {
    console.log("efe");
    navigate(`/profile/${id}`);
    window.location.reload();
  };

  return (
    <Grid
      className="profile-button"
      container
      onClick={handleClickProfileButton}
    >
      <Grid className="profile-button__img" item>
        <img style={{ borderRadius: "60px" }} src={userImage} />
      </Grid>
      <Grid item>
        <Grid
          className="profile-button__user-info"
          container
          direction="column"
        >
          <Grid className="profile-button__user-info__name">{nickname}</Grid>
          <Grid className="profile-button__user-info__email">{email.replace('"', "").replace('"', "")}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileButton;
