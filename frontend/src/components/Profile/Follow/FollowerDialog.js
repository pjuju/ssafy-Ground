import { Dialog, DialogTitle, List } from "@mui/material";
import FollowerUserProfile from "./FollowerUserProfile";
import "styles/Profile/Follow.scss";
import { getFollowerList } from "api/follow";
import { useEffect, useState } from "react";

function FollowerDialog(props) {
  const { onClose, open, profileId, userId } = props;
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    // 팝업 창이 열릴 때
    if (open === true) {
      getFollowerList(profileId, userId, (res) => {
        setFollowerList(res.data);
        console.log(res.data);
      });
    }
  }, [open]);

  return (
    <Dialog className="dialog-follower" onClose={onClose} open={open}>
      <DialogTitle>팔로워</DialogTitle>
      <List className="dialog-follower__list">
        {followerList.length > 0 ? (
          followerList.map((follower, index) => {
            return (
              <FollowerUserProfile
                key={index}
                userImage={follower.userImage}
                nickname={follower.nickname}
                username={follower.username}
              />
            );
          })
        ) : (
          <p className="dialog-follower__list--none">
            해당 사용자를 팔로우하고 있는 사람이 없습니다.
          </p>
        )}
      </List>
    </Dialog>
  );
}

export default FollowerDialog;
