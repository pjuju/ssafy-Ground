import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import userImage from "assets/images/userImage.png";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "api/firebase";

function UserResultItem({ user }) {
  const image = user.userImage
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    preview();
    console.log(image)
  });

  useEffect(() => {
    fetchImage();
  }, [image]);

  const handleClickUser = () => {
    navigate(`/profile/${user.id}`);
  };

  const preview = () => {
    if (profileImg === "") return false;
    const imgElement = document.querySelector(".user-result__profile-wrapper > img");
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

  return (
    <Grid className="user-result__inner" container onClick={handleClickUser}>
      <div className="user-result__profile-wrapper">
        <img
          className="user-result__profile-img"
          src={profileImg||userImage}
          alt="user_image"
        />
      </div>
      <Grid item xs={9}>
        <Grid
          className="user-result__info-wrapper"
          container
          alignContent="center"
        >
          <Grid className="user-result__info" container direction="column">
            <Grid className="user-result__info__nickname" item>
              {user.nickname}
            </Grid>
            <Grid className="user-result__info__userId" item>
              {user.username}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserResultItem;
